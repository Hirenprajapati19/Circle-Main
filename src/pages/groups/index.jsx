import React, { useEffect, useMemo, useState, useRef } from 'react'
import { Routes, Route, useParams, Link, useNavigate } from 'react-router-dom'
import { Users, Plus, MessageSquare, ArrowLeft, Phone, Video, Info, Edit3, Save, X, Check, CheckCheck, Image as ImageIcon, BellOff, Link as LinkIcon, Trash2, LogOut } from 'lucide-react'
import Card from '../../components/layout/Card'
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'
import Composer from '../../components/chat/Composer'
import { useAuth } from '../../store/useAuth'

const STORAGE_KEY = 'circle_groups_v1'
const MSG_STORAGE_KEY = 'circle_group_messages_v1'

function loadGroups() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function saveGroups(groups) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(groups))
}

function loadAllMessages() {
  try {
    const raw = localStorage.getItem(MSG_STORAGE_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

function saveAllMessages(all) {
  localStorage.setItem(MSG_STORAGE_KEY, JSON.stringify(all))
}

function getInitials(name) {
  const parts = (name || '').trim().split(/\s+/)
  if (parts.length === 0) return '?'
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[1][0]).toUpperCase()
}

const GroupsList = () => {
  const { user } = useAuth()
  const currentUserName = user?.name || user?.username || user?.email || 'me'
  const [groups, setGroups] = useState(() => loadGroups())
  const [title, setTitle] = useState('')

  useEffect(() => saveGroups(groups), [groups])

  const createGroup = () => {
    const name = title.trim()
    if (!name) return
    const newGroup = {
      id: Date.now().toString(),
      name,
      members: [currentUserName],
      admin: currentUserName,
      avatar: '',
      description: '',
      muted: false,
      inviteCode: Math.random().toString(36).slice(2, 8),
      createdAt: new Date().toISOString()
    }
    setGroups(prev => [newGroup, ...prev])
    setTitle('')
  }

  return (
    <div className="p-4 sm:p-6 bg-black min-h-screen">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-red-600 rounded-full flex items-center justify-center">
              <Users className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-white">Groups</h1>
          </div>
        </div>

        <Card>
          <div className="p-3 sm:p-4 flex items-center gap-2">
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Create a group (e.g., Project A Team)"
              className="flex-1"
            />
            <Button onClick={createGroup} disabled={!title.trim()} className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Create
            </Button>
          </div>
        </Card>

        <div className="space-y-3">
          {groups.length === 0 && (
            <div className="text-gray-400 text-sm">No groups yet. Create your first group.</div>
          )}
          {groups.map(g => (
            <Link key={g.id} to={`/dashboard/groups/${g.id}`} className="block">
              <Card className="hover:bg-gray-900/60">
                <div className="p-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center overflow-hidden text-white">
                    {g.avatar ? (
                      <img src={g.avatar} alt={g.name} className="w-10 h-10 object-cover" />
                    ) : (
                      <span className="text-sm font-medium">{getInitials(g.name)}</span>
                    )}
                  </div>
                  <div className="min-w-0">
                    <div className="text-white font-medium truncate">{g.name}</div>
                    <div className="text-xs text-gray-400">{g.members.length} members</div>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

const GroupChat = () => {
  const { groupId } = useParams()
  const [groups, setGroups] = useState(() => loadGroups())
  const group = useMemo(() => groups.find(g => g.id === groupId), [groups, groupId])
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [newMember, setNewMember] = useState('')
  const [showInfo, setShowInfo] = useState(false)
  const [editingName, setEditingName] = useState(false)
  const [nameDraft, setNameDraft] = useState('')
  const [editingDesc, setEditingDesc] = useState(false)
  const [descDraft, setDescDraft] = useState('')
  const endRef = useRef(null)
  const navigate = useNavigate()
  const { user } = useAuth()
  const currentUserName = user?.name || user?.username || user?.email || 'me'

  // Load messages for this group
  useEffect(() => {
    const all = loadAllMessages()
    const list = all[groupId] || []
    setMessages(list)
  }, [groupId])

  // Ensure admin exists (creator/admin fallback)
  useEffect(() => {
    if (group && !group.admin) {
      const fallbackAdmin = group.members?.[0] || currentUserName
      const updated = groups.map(g => g.id === group.id ? { ...g, admin: fallbackAdmin } : g)
      setGroups(updated)
      saveGroups(updated)
    }
  }, [group, groups, currentUserName])

  // Persist on change
  useEffect(() => {
    const all = loadAllMessages()
    all[groupId] = messages
    saveAllMessages(all)
  }, [messages, groupId])

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  if (!group) {
    return (
      <div className="p-6 text-gray-400">Group not found.</div>
    )
  }

  const startEditName = () => {
    setNameDraft(group.name)
    setEditingName(true)
  }

  const saveName = () => {
    const newName = nameDraft.trim()
    if (!newName) return
    const updated = groups.map(g => g.id === group.id ? { ...g, name: newName } : g)
    setGroups(updated)
    saveGroups(updated)
    setEditingName(false)
  }

  const startEditDesc = () => {
    setDescDraft(group.description || '')
    setEditingDesc(true)
  }

  const saveDesc = () => {
    const newDesc = (descDraft || '').trim()
    const updated = groups.map(g => g.id === group.id ? { ...g, description: newDesc } : g)
    setGroups(updated)
    saveGroups(updated)
    setEditingDesc(false)
  }

  const addMember = () => {
    const name = newMember.trim()
    if (!name) return
    const updated = groups.map(g => g.id === group.id ? { ...g, members: [...g.members, name] } : g)
    setGroups(updated)
    saveGroups(updated)
    setNewMember('')
    // sender logic not needed; messages are sent from current user
  }

  const removeMember = (name) => {
    // Only admin can remove members, and admin cannot be removed
    if (group.admin && currentUserName !== group.admin) {
      alert('Only the admin can remove members')
      return
    }
    if (group.admin && name === group.admin) {
      alert('Admin cannot be removed')
      return
    }
    const updated = groups.map(g => g.id === group.id ? { ...g, members: g.members.filter(m => m !== name) } : g)
    setGroups(updated)
    saveGroups(updated)
  }

  const send = () => {
    const content = input.trim()
    if (!content) return
    const newMsg = {
      id: Date.now().toString(),
      content,
      sender: currentUserName,
      timestamp: new Date().toISOString(),
      status: 'read'
    }
    setMessages(prev => [...prev, newMsg])
    setInput('')
  }

  const toggleMute = () => {
    const updated = groups.map(g => g.id === group.id ? { ...g, muted: !g.muted } : g)
    setGroups(updated)
    saveGroups(updated)
  }

  const copyInvite = async () => {
    const link = `${window.location.origin}/join/${group.inviteCode}`
    try {
      await navigator.clipboard.writeText(link)
      alert('Invite link copied')
    } catch {
      alert(link)
    }
  }

  const changeAvatar = (e) => {
    const file = e.target.files && e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      const updated = groups.map(g => g.id === group.id ? { ...g, avatar: reader.result } : g)
      setGroups(updated)
      saveGroups(updated)
    }
    reader.readAsDataURL(file)
  }

  const leaveGroup = () => {
    // Remove current user from members
    const updated = groups.map(g => g.id === group.id ? { ...g, members: g.members.filter(m => m !== currentUserName) } : g)
    setGroups(updated)
    saveGroups(updated)
    navigate('/dashboard/groups')
  }

  const deleteGroup = () => {
    const ok = confirm('Delete this group for everyone?')
    if (!ok) return
    const updated = groups.filter(g => g.id !== group.id)
    setGroups(updated)
    saveGroups(updated)
    // also remove messages
    const all = loadAllMessages()
    delete all[group.id]
    saveAllMessages(all)
    navigate('/dashboard/groups')
  }

  return (
    <div className="flex flex-col h-full min-h-0 bg-black overflow-hidden ">
      <div className="px-4 py-3 border-b border-gray-800 flex items-center gap-3">
        <button onClick={() => navigate('/dashboard/groups')} className="p-2 -ml-2 rounded-lg hover:bg-gray-900" title="Back to groups">
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>
        <div className="w-9 h-9 bg-gray-800 rounded-full flex items-center justify-center overflow-hidden">
          {group.avatar ? (
            <img src={group.avatar} alt="group" className="w-9 h-9 object-cover" />
          ) : (
            <Users className="w-5 h-5 text-white" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <div className="text-white font-semibold truncate">{group.name}</div>
          </div>
          <div className="text-xs text-gray-400">{group.members.length} members</div>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-lg hover:bg-gray-900" title="Voice call">
            <Phone className="w-5 h-5 text-white" />
          </button>
          <button className="p-2 rounded-lg hover:bg-gray-900" title="Video call">
            <Video className="w-5 h-5 text-white" />
          </button>
          <button onClick={() => setShowInfo(true)} className="p-2 rounded-lg hover:bg-gray-900" title="Group info">
            <Info className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      {/* Group Info side panel */}
      {showInfo && (
        <div className="fixed inset-0 z-50 flex">
          <div className="flex-1 bg-black/50" onClick={() => setShowInfo(false)} />
          <div className="w-full sm:w-[380px] bg-black border-l border-gray-800 h-full flex flex-col">
            <div className="p-4 border-b border-gray-800 flex items-center justify-between">
              <div className="text-white font-semibold">Group info</div>
              <button onClick={() => setShowInfo(false)} className="p-2 rounded-lg hover:bg-gray-900">
                <X className="w-5 h-5 text-white" />
              </button>
            </div>
            <div className="p-4 space-y-6 overflow-y-auto">
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 rounded-full bg-gray-800 flex items-center justify-center overflow-hidden">
                  {group.avatar ? (
                    <img src={group.avatar} alt="group" className="w-16 h-16 object-cover" />
                  ) : (
                    <Users className="w-7 h-7 text-white" />
                  )}
                </div>
                <label className="inline-flex items-center gap-2 text-sm text-gray-200 cursor-pointer">
                  <ImageIcon className="w-4 h-4" />
                  <span>Change photo</span>
                  <input type="file" accept="image/*" className="hidden" onChange={changeAvatar} />
                </label>
              </div>

              <div>
                <div className="text-xs text-gray-400 mb-2">Group name</div>
                {editingName ? (
                  <div className="flex items-center gap-2">
                    <Input value={nameDraft} onChange={(e) => setNameDraft(e.target.value)} />
                    <Button onClick={saveName} disabled={!nameDraft.trim()} className="flex items-center gap-2">
                      <Save className="w-4 h-4" /> Save
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <div className="text-white font-medium">{group.name}</div>
                    <Button variant="ghost" className="p-2" onClick={startEditName}>
                      <Edit3 className="w-4 h-4 text-gray-300" />
                    </Button>
                  </div>
                )}
              </div>

              <div>
                <div className="text-xs text-gray-400 mb-2">Description</div>
                {editingDesc ? (
                  <div className="flex items-center gap-2">
                    <Input value={descDraft} onChange={(e) => setDescDraft(e.target.value)} placeholder="Type group description" />
                    <Button onClick={saveDesc} className="flex items-center gap-2"><Save className="w-4 h-4" /> Save</Button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <div className="text-gray-200 text-sm">{group.description || 'No description'}</div>
                    <Button variant="ghost" className="p-2" onClick={startEditDesc}>
                      <Edit3 className="w-4 h-4 text-gray-300" />
                    </Button>
                  </div>
                )}
              </div>

              <div>
                <div className="text-xs text-gray-400 mb-2">Admin</div>
                <div className="text-sm text-gray-200">{group.admin || currentUserName}</div>
              </div>

              <div>
                <div className="text-xs text-gray-400 mb-2">Members</div>
                <div className="flex items-center gap-2">
                  <Input value={newMember} onChange={(e) => setNewMember(e.target.value)} placeholder="Add member name" />
                  <Button onClick={addMember} disabled={!newMember.trim()}>Add</Button>
                </div>
                {group.members.length > 0 && (
                  <div className="mt-3 space-y-2">
                    {group.members.map(m => (
                      <div key={m} className="flex items-center justify-between bg-gray-900 rounded-lg px-3 py-2">
                        <div className="text-gray-100 text-sm">
                          {m} {group.admin === m && <span className="ml-2 text-[11px] text-gray-400">admin</span>}
                        </div>
                        {currentUserName === group.admin && m !== group.admin && (
                          <button onClick={() => removeMember(m)} className="text-gray-400 hover:text-red-400 text-sm">Remove</button>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between bg-gray-900 rounded-lg px-3 py-2">
                <div className="flex items-center gap-2 text-sm text-gray-200">
                  <BellOff className="w-4 h-4" /> Mute notifications
                </div>
                <button onClick={toggleMute} className={`text-xs px-2 py-1 rounded ${group.muted ? 'bg-red-600 text-white' : 'bg-gray-700 text-gray-200'}`}>
                  {group.muted ? 'Muted' : 'Mute'}
                </button>
              </div>

              <div className="bg-gray-900 rounded-lg px-3 py-2 space-y-2">
                <div className="text-xs text-gray-400">Invite link</div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 text-sm text-gray-200 truncate">{window.location.origin}/join/{group.inviteCode}</div>
                  <Button size="sm" onClick={copyInvite} className="flex items-center gap-2"><LinkIcon className="w-4 h-4" />Copy</Button>
                </div>
              </div>

              <div className="space-y-2">
                <Button variant="ghost" className="w-full justify-start text-red-400 hover:text-red-300" onClick={leaveGroup}>
                  <LogOut className="w-4 h-4 mr-2" /> Leave group
                </Button>
                <Button variant="ghost" className="w-full justify-start text-red-500 hover:text-red-400" onClick={deleteGroup}>
                  <Trash2 className="w-4 h-4 mr-2" /> Delete group
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-black">
        {messages.length === 0 && (
          <div className="text-center text-gray-500 py-8">
            <p>No messages yet. Start the conversation!</p>
          </div>
        )}

        {messages.map(m => (
          <div key={m.id} className={`flex ${m.sender === currentUserName ? 'justify-end' : 'justify-start'} items-end gap-2`}>
            {m.sender !== currentUserName && (
              <div className="w-7 h-7 rounded-full bg-gray-800 text-gray-200 flex items-center justify-center text-[10px]">
                {getInitials(m.sender)}
              </div>
            )}
            <div className={`max-w-[80%] sm:max-w-[70%] px-3 py-2 rounded-xl shadow-sm text-sm ${m.sender === currentUserName ? 'bg-el-blue-500 text-white' : 'bg-gray-100 text-gray-900'}`}>
              <p className="whitespace-pre-wrap break-words">{m.content}</p>
              <div className={`flex items-center gap-2 text-[10px] mt-1 ${m.sender === currentUserName ? 'text-el-blue-100' : 'text-gray-500'}`}>
                <span>{new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                {m.sender === currentUserName && (
                  <span className="inline-flex items-center">
                    {m.status === 'read' ? <CheckCheck className="w-3.5 h-3.5 text-blue-300" /> : m.status === 'delivered' ? <CheckCheck className="w-3.5 h-3.5" /> : <Check className="w-3.5 h-3.5" />}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
        <div ref={endRef} />
      </div>

      {/* Composer */}
      <div className="border-t border-gray-800">
        <Composer value={input} onChange={setInput} onSend={send} />
      </div>
    </div>
  )
}

const GroupsPage = () => {
  return (
    <Routes>
      <Route index element={<GroupsList />} />
      <Route path=":groupId" element={<GroupChat />} />
    </Routes>
  )
}

export default GroupsPage


