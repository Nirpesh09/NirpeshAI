import React from 'react'
import ReactDOM from 'react-dom/client'
import { AnimatePresence, motion } from 'framer-motion'
import { Bell, CheckCheck, Menu, Mic, Moon, Paperclip, Search, Send, Smile, Sun } from 'lucide-react'
import './styles.css'

type Message = {
  id: string
  fromMe: boolean
  text: string
  time: string
  status?: 'sending' | 'sent' | 'read'
}

type Chat = {
  id: string
  name: string
  avatar: string
  online?: boolean
  unread: number
  lastSeen: string
  messages: Message[]
}

const initialChats: Chat[] = [
  {
    id: '1',
    name: 'Product Team',
    avatar: '🚀',
    unread: 3,
    online: true,
    lastSeen: 'online',
    messages: [
      { id: 'm1', fromMe: false, text: 'Can you share the latest build?', time: '10:22 AM' },
      { id: 'm2', fromMe: true, text: 'Uploading now. Animations feel great ✨', time: '10:24 AM', status: 'read' }
    ]
  },
  {
    id: '2',
    name: 'Design Squad',
    avatar: '🎨',
    unread: 0,
    lastSeen: 'last seen 2m ago',
    messages: [
      { id: 'm3', fromMe: false, text: 'Telegram-like transitions are done.', time: '09:10 AM' },
      { id: 'm4', fromMe: true, text: 'Perfect, shipping this UI.', time: '09:12 AM', status: 'read' }
    ]
  }
]

function App() {
  const [dark, setDark] = React.useState(true)
  const [query, setQuery] = React.useState('')
  const [chats, setChats] = React.useState<Chat[]>(initialChats)
  const [activeChatId, setActiveChatId] = React.useState(initialChats[0].id)
  const [draft, setDraft] = React.useState('')
  const activeChat = chats.find((c) => c.id === activeChatId)!

  const filteredChats = chats.filter((chat) => chat.name.toLowerCase().includes(query.toLowerCase()))

  const sendMessage = () => {
    const text = draft.trim()
    if (!text) return

    const newMessage: Message = {
      id: crypto.randomUUID(),
      fromMe: true,
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'sent'
    }

    setChats((prev) =>
      prev.map((chat) =>
        chat.id === activeChatId
          ? {
              ...chat,
              messages: [...chat.messages, newMessage]
            }
          : chat
      )
    )

    setDraft('')

    setTimeout(() => {
      const reply: Message = {
        id: crypto.randomUUID(),
        fromMe: false,
        text: 'Nice. This feels premium and smooth 👌',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }

      setChats((prev) =>
        prev.map((chat) =>
          chat.id === activeChatId
            ? {
                ...chat,
                unread: 0,
                messages: [...chat.messages, reply]
              }
            : chat
        )
      )
    }, 900)
  }

  React.useEffect(() => {
    document.body.className = dark ? 'theme-dark' : 'theme-light'
  }, [dark])

  return (
    <div className="app-shell">
      <motion.aside
        initial={{ x: -24, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.35 }}
        className="sidebar"
      >
        <div className="sidebar-header">
          <button className="icon-btn"><Menu size={18} /></button>
          <h1>Nirpesh Chat</h1>
          <button className="icon-btn" onClick={() => setDark((d) => !d)}>{dark ? <Sun size={18} /> : <Moon size={18} />}</button>
        </div>

        <label className="search">
          <Search size={16} />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search chats" />
        </label>

        <div className="chat-list">
          {filteredChats.map((chat) => (
            <motion.button
              key={chat.id}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => setActiveChatId(chat.id)}
              className={`chat-item ${chat.id === activeChatId ? 'active' : ''}`}
            >
              <span className="avatar">{chat.avatar}</span>
              <span className="chat-main">
                <span className="chat-top">
                  <strong>{chat.name}</strong>
                  <small>{chat.messages.at(-1)?.time}</small>
                </span>
                <span className="chat-bottom">
                  {chat.messages.at(-1)?.text}
                </span>
              </span>
              {chat.unread > 0 && <span className="badge">{chat.unread}</span>}
            </motion.button>
          ))}
        </div>
      </motion.aside>

      <main className="chat-panel">
        <motion.header
          key={activeChat.id}
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.25 }}
          className="chat-header"
        >
          <div>
            <h2>{activeChat.name}</h2>
            <small>{activeChat.online ? 'online' : activeChat.lastSeen}</small>
          </div>
          <div className="chat-actions">
            <button className="icon-btn"><Bell size={18} /></button>
            <button className="icon-btn"><Search size={18} /></button>
          </div>
        </motion.header>

        <section className="messages">
          <AnimatePresence initial={false}>
            {activeChat.messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 12, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
                className={`bubble ${message.fromMe ? 'me' : 'them'}`}
              >
                <p>{message.text}</p>
                <span>
                  {message.time}
                  {message.fromMe && message.status === 'read' ? <CheckCheck size={14} /> : null}
                </span>
              </motion.div>
            ))}
          </AnimatePresence>
        </section>

        <footer className="composer">
          <button className="icon-btn"><Smile size={18} /></button>
          <button className="icon-btn"><Paperclip size={18} /></button>
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Write a message..."
          />
          {draft.trim().length > 0 ? (
            <button className="send-btn" onClick={sendMessage}><Send size={16} /></button>
          ) : (
            <button className="send-btn secondary"><Mic size={16} /></button>
          )}
        </footer>
      </main>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
