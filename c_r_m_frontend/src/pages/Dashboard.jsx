import { useState, useEffect, useMemo, useCallback, memo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { data, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard, User, CreditCard, Calendar, LifeBuoy, 
  Gift, Settings, Search, Bell, Plus, Bot, Clock, 
  MapPin, FileText, Award, LogOut, Send, X, ShieldCheck, 
  Key, Layers, Navigation, Download, UploadCloud, Smartphone, 
  Laptop, Sliders, CheckCircle2, AlertCircle, ExternalLink, ChevronRight,
  Phone, Mail, MessageCircle, Edit, Eye, Users, Briefcase,
  Target, PhoneCall, ChevronLeft, Menu, Filter, TrendingUp,
  Activity, DollarSign, UserPlus, ClipboardList, Trash2, RefreshCw
} from 'lucide-react'
import { toast } from 'react-toastify'
import styles from './Dashboard.module.css'

// API Configuration
const API_URL = 'https://c-r-m-project.onrender.com/api';

// --- API HELPER ---
const apiCall = async (endpoint, method = 'GET', body = null) => {
  const token = localStorage.getItem('authToken');
  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': `Bearer ${token}`
  };

  const config = { method, headers };
  if (body) config.body = JSON.stringify(body);

  try {
    const response = await fetch(`${API_URL}${endpoint}`, config);
    if (response.status === 401) {
      window.location.href = '/login';
      return null;
    }
    return response.json();
  } catch (error) {
    console.error("API Error:", error);
    return null;
  }
};

// --- UNIVERSAL EXTRACTOR ---
const getBankedMySQLUser = () => {
  try {
    const raw = localStorage.getItem('userData') || sessionStorage.getItem('userData')
    if (!raw) return null
    return JSON.parse(raw)
  } catch (err) {
    console.error("Failed to parse banked MySQL user:", err)
    return null
  }
}

// Static Data
const upcomingTours = [
  { id: 'APP-302', title: 'Phase II Botanical Gated Gated Walkthrough', date: 'Tomorrow, 11:00 AM', site: 'Sector-7 Gated Community Site', executive: 'Rahul Sharma (VP Sales)', status: 'GPS Gatepass Active' },
  { id: 'APP-289', title: 'Virtual Vaastu & Topography Zoom Inspection', date: '14 Nov 2024, 04:00 PM', site: 'Secure Cloud Video Bridge', executive: 'Autonomous Vaastu AI Agent', status: 'Link Dispatched' },
]

const liveSupportTickets = [
  { id: 'TKT-109', query: 'Requesting RERA Title Deed Encumbrance Certificate', module: 'Legal Documentation', status: 'In Progress', logged: '2h ago' },
  { id: 'TKT-094', query: 'Preferential Location Charge (PLC) Premium Audit', module: 'Escrow Ledger', status: 'Resolved', logged: '3d ago' },
]

const win32AuditLogs = [
  { ip: '115.96.212.14', hardware: 'Windows 11 // Chrome Win32', location: 'Mumbai, India', time: 'Today, 09:14 AM', protocol: '256-bit JWT Verified' },
  { ip: '115.96.212.14', hardware: 'Apple iPhone 15 Pro // iOS App', location: 'Mumbai, India', time: 'Yesterday, 08:30 PM', protocol: 'Biometric FaceID Auth' },
]

// =============================================
// STEP 10: React.memo - Prevents unnecessary re-renders
// =============================================

// Lead Card Component - wrapped with React.memo
const LeadCard = memo(({ lead, onCall, onWhatsApp, onEmail, onAddNote, onViewDetails, onUpdate, onDelete }) => {
  const getStatusConfig = (status) => {
    const configs = {
      new:           { label: 'New Lead',       color: '#2563EB', bg: '#EFF6FF' },
      contacted:     { label: 'Contacted',       color: '#F59E0B', bg: '#FFF7ED' },
      interested:    { label: 'Interested',      color: '#10B981', bg: '#ECFDF5' },
      not_interested:{ label: 'Not Interested',  color: '#EF4444', bg: '#FEF2F2' },
      converted:     { label: 'Converted',       color: '#8B5CF6', bg: '#F5F3FF' }
    }
    return configs[status] || configs.new
  }

  const statusConfig = getStatusConfig(lead.status)

  return (
    <motion.div
      className={styles.leadCard}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4, boxShadow: '0 12px 24px rgba(0,0,0,0.12)' }}
      transition={{ duration: 0.2 }}
    >
      <div className={styles.leadCardHeader}>
        <div className={styles.leadCardTitle}>
          <h3>{lead.title}</h3>
          <span className={styles.leadId}>{lead.id}</span>
        </div>
        <span
          className={styles.leadStatusBadge}
          style={{ backgroundColor: statusConfig.bg, color: statusConfig.color }}
        >
          {statusConfig.label}
        </span>
      </div>

      <div className={styles.leadCardBody}>
        <div className={styles.leadInfoRow}>
          <User size={14} className={styles.leadIcon} />
          <span className={styles.leadLabel}>Customer:</span>
          <span className={styles.leadValue}>{lead.customerName}</span>
        </div>
        <div className={styles.leadInfoRow}>
          <Phone size={14} className={styles.leadIcon} />
          <span className={styles.leadLabel}>Phone:</span>
          <span className={styles.leadValue}>{lead.phone}</span>
        </div>
        <div className={styles.leadInfoRow}>
          <Mail size={14} className={styles.leadIcon} />
          <span className={styles.leadLabel}>Email:</span>
          <span className={styles.leadValue}>{lead.email}</span>
        </div>
        <div className={styles.leadInfoRow}>
          <Briefcase size={14} className={styles.leadIcon} />
          <span className={styles.leadLabel}>Project:</span>
          <span className={styles.leadValue}>{lead.project}</span>
        </div>
        <div className={styles.leadInfoRow}>
          <Target size={14} className={styles.leadIcon} />
          <span className={styles.leadLabel}>Source:</span>
          <span className={styles.leadValue}>{lead.source}</span>
        </div>
        <div className={styles.leadInfoRow}>
          <DollarSign size={14} className={styles.leadIcon} />
          <span className={styles.leadLabel}>Budget:</span>
          <span className={styles.leadValue}>{lead.budget}</span>
        </div>
        <div className={styles.leadInfoRow}>
          <UserPlus size={14} className={styles.leadIcon} />
          <span className={styles.leadLabel}>Assigned To:</span>
          <span className={styles.leadValue}>{lead.assignedTo}</span>
        </div>
        <div className={styles.leadInfoRow}>
          <Calendar size={14} className={styles.leadIcon} />
          <span className={styles.leadLabel}>Created:</span>
          <span className={styles.leadValue}>{lead.createdDate}</span>
        </div>
        <div className={styles.leadInfoRow}>
          <Clock size={14} className={styles.leadIcon} />
          <span className={styles.leadLabel}>Follow-up:</span>
          <span className={styles.leadValue}>{lead.followUpDate}</span>
        </div>
      </div>

      <div className={styles.leadCardActions}>
        <button
          className={styles.leadActionBtn}
          onClick={() => onCall(lead)}
          title={`Call ${lead.customerName} - ${lead.phone}`}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <Phone size={16} />
        </button>
        <button className={styles.leadActionBtn} onClick={() => onWhatsApp(lead)} title="WhatsApp">
          <MessageCircle size={16} />
        </button>
        <button className={styles.leadActionBtn} onClick={() => onEmail(lead)} title="Compose & Send Email">
          <Mail size={16} />
        </button>
        <button className={styles.leadActionBtn} onClick={() => onAddNote(lead)} title="Add Note">
          <Edit size={16} />
        </button>
        <button className={styles.leadActionBtn} onClick={() => onViewDetails(lead)} title="View Details">
          <Eye size={16} />
        </button>
        <button className={styles.leadActionBtn} onClick={() => onUpdate(lead)} title="Update Lead" style={{ color: '#10B981' }}>
          <RefreshCw size={16} />
        </button>
        <button className={styles.leadActionBtn} onClick={() => onDelete(lead)} title="Delete Lead" style={{ color: '#EF4444' }}>
          <Trash2 size={16} />
        </button>
      </div>
    </motion.div>
  )
})

// Deal Card Component - wrapped with React.memo
const DealCard = memo(({ deal }) => {
  const getStageConfig = (stage) => {
    const configs = {
      negotiation: { label: 'Negotiation', color: '#F59E0B', bg: '#FFF7ED' },
      won:         { label: 'Won',         color: '#10B981', bg: '#ECFDF5' },
      lost:        { label: 'Lost',        color: '#EF4444', bg: '#FEF2F2' },
      proposal:    { label: 'Proposal',    color: '#2563EB', bg: '#EFF6FF' }
    }
        return configs[stage?.toLowerCase()] || configs.negotiation  // ✅ Added toLowerCase()
  }

  const stageConfig = getStageConfig(deal.stage)

  return (
    <motion.div
      className={styles.leadCard}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4, boxShadow: '0 12px 24px rgba(0,0,0,0.12)' }}
      transition={{ duration: 0.2 }}
    >
      <div className={styles.leadCardHeader}>
        <div className={styles.leadCardTitle}>
          <h3>{deal.deal_name}</h3>
          <span className={styles.leadId}>{deal.id}</span>
        </div>
        <span
          className={styles.leadStatusBadge}
          style={{ backgroundColor: stageConfig.bg, color: stageConfig.color }}
        >
          {stageConfig.label}
        </span>
      </div>

      <div className={styles.leadCardBody}>
        <div className={styles.leadInfoRow}>
          <User size={14} className={styles.leadIcon} />
          <span className={styles.leadLabel}>Client:</span>
          <span className={styles.leadValue}>{deal.client_name}</span>
        </div>
        <div className={styles.leadInfoRow}>
          <Briefcase size={14} className={styles.leadIcon} />
          <span className={styles.leadLabel}>Project:</span>
          <span className={styles.leadValue}>{deal.project}</span>
        </div>
        <div className={styles.leadInfoRow}>
          <DollarSign size={14} className={styles.leadIcon} />
          <span className={styles.leadLabel}>Value:</span>
          <span className={styles.leadValue} style={{ fontWeight: 700, color: '#0f172a' }}>
            {deal.deal_value}
          </span>
        </div>
        <div className={styles.leadInfoRow}>
          <Clock size={14} className={styles.leadIcon} />
          <span className={styles.leadLabel}>Close Date:</span>
          <span className={styles.leadValue}>{deal.expected_close}</span>
        </div>
      </div>
    </motion.div>
  )
})

export default function Dashboard() {
  const navigate = useNavigate()

  // State for Backend Data
  const [crmLeads,        setCrmLeads]        = useState([])
  const [dealsList,       setDealsList]       = useState([])
  const [emailsList,      setEmailsList]      = useState([])
  const [callsList,       setCallsList]       = useState([])
  const [tasksList,       setTasksList]       = useState([])
  const [contactsList,    setContactsList]    = useState([])
  const [accountsList,    setAccountsList]    = useState([])
  const [plotInventory,   setPlotInventory]   = useState([])
  const [financialLedger, setFinancialLedger] = useState([])
  const [dashboardStats,  setDashboardStats]  = useState({ total_leads: 0, conversion_rate: 0 })
  const [isLoading,       setIsLoading]       = useState(true)

  const [activeView,       setActiveView]       = useState('Dashboard')
  const [modalState,       setModalState]       = useState({ type: null, data: null })
  const [searchFilter,     setSearchFilter]     = useState('')
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [selectedLead,     setSelectedLead]     = useState(null)

  // Update Lead Form State
  const [updateLeadForm, setUpdateLeadForm] = useState({
    title:          '',
    customer_name:  '',
    phone:          '',
    email:          '',
    project:        '',
    source:         '',
    budget:         '',
    assigned_to:    '',
    status:         'new',
    notes:          '',
    follow_up_date: '',
  })

  // New Lead Form State
  const [newLeadForm, setNewLeadForm] = useState({
    title:          '',
    customer_name:  '',
    phone:          '',
    email:          '',
    project:        '',
    source:         '',
    budget:         '',
    assigned_to:    '',
    status:         'new',
    notes:          '',
    follow_up_date: '',
    created_date:   new Date().toISOString().split('T')[0],
  })

  // New Contact Form State
  const [newContactForm, setNewContactForm] = useState({
    full_name: '',
    phone: '',
    email: '',
    company: '',
    designation: '',
    city: '',
    state: '',
    status: 'active'
  })

  const [newLeadSubmitting, setNewLeadSubmitting] = useState(false)
  const [contactSubmitting, setContactSubmitting] = useState(false)

  // Compose Email Form State
  const [composeEmailForm, setComposeEmailForm] = useState({
    to:      '',
    subject: '',
    message: '',
  })

  const [emailSending, setEmailSending] = useState(false)

  // Call Log Form State
  const [callLogForm, setCallLogForm] = useState({
    duration: '',
    notes:    '',
  })

  const [callLogSaving, setCallLogSaving] = useState(false)

  // Dynamic Profile State
  const [userProfile, setUserProfile] = useState({
    id:      'Loading...',
    name:    'User',
    email:   '...',
    phone:   '...',
    company: '...',
    address: '...',
    type:    'Investor',
    avatar:  'U',
    regDate: '...',
    status:  'Active',
    plan:    'Standard',
    expiry:  '...',
    points:  0,
    refCode: 'N/A'
  })

  const [applicationData, setApplicationData] = useState({
    applicantName: '',
    applicantPAN:  '',
    paymentPlan:   'Upfront Downpayment (5% Discount)',
    notes:         ''
  })

  // =============================================
  // STEP 4: Promise.all() - Load all APIs in parallel
  // =============================================
  useEffect(() => {
    const initDashboard = async () => {
      setIsLoading(true)

      // Load User Profile
      const liveUser = getBankedMySQLUser()
      if (liveUser) {
        const rawName       = liveUser.full_name || liveUser.name || 'User'
        const cleanInitials = rawName.split(' ').map(w => w[0]).join('').substring(0, 2).toUpperCase()

        setUserProfile(prev => ({
          ...prev,
          id:      liveUser.id ? `CUST-00${liveUser.id}` : 'N/A',
          name:    rawName,
          email:   liveUser.email   || 'N/A',
          phone:   liveUser.phone   || 'N/A',
          company: liveUser.company || 'N/A',
          address: liveUser.address || 'N/A',
          avatar:  cleanInitials,
          refCode: (liveUser.company || 'USER').toUpperCase() + '-50K'
        }))
        setApplicationData(prev => ({ ...prev, applicantName: rawName }))
      }

      try {
        // STEP 4: All APIs fire simultaneously with Promise.all()
        // Before: sequential = ~3.5 seconds
        // After:  parallel   = ~500ms (fastest single response)
        const [
          leadsRes,
          contactsRes,
          accountsRes,
          dealsRes,
          tasksRes,
          callsRes,
          emailsRes,
        ] = await Promise.all([
          apiCall('/leads'),
          apiCall('/contacts'),
          apiCall('/accounts'),
          apiCall('/deals'),
          apiCall('/tasks'),
          apiCall('/calls'),
          apiCall('/emails'),
        ])

        // Process Leads
        if (leadsRes?.status) {
          const formattedLeads = (leadsRes.data || []).map(item => ({
            ...item,
            customerName: item.customer_name,
            assignedTo:   item.assigned_to,
            createdDate:  item.created_date,
            followUpDate: item.follow_up_date,
          }))
          setCrmLeads(formattedLeads)
          setDashboardStats({ total_leads: formattedLeads.length, conversion_rate: 0 })
        }

        // Process remaining data
        if (contactsRes?.status)  setContactsList(contactsRes.data  || [])
        if (accountsRes?.status)  setAccountsList(accountsRes.data  || [])
        if (dealsRes?.status)     setDealsList(dealsRes.data         || [])
        if (tasksRes?.status)     setTasksList(tasksRes.data         || [])
        if (callsRes?.status)     setCallsList(callsRes.data         || [])
        if (emailsRes?.status)    setEmailsList(emailsRes.data       || [])

        setPlotInventory([])
        setFinancialLedger([])

      } catch (error) {
        console.error("Error loading dashboard data", error)
      }

      setIsLoading(false)
    }

    // STEP 5: Only one call inside useEffect
    initDashboard()
  }, [])

  // Refresh Emails
  const refreshEmails = useCallback(async () => {
    const emailsResponse = await apiCall('/emails')
    if (emailsResponse?.status) setEmailsList(emailsResponse.data || [])
  }, [])

  // Refresh Calls
  const refreshCalls = useCallback(async () => {
    const callsResponse = await apiCall('/calls')
    if (callsResponse?.status) setCallsList(callsResponse.data || [])
  }, [])

  const handleApplyPlotSubmit = async (e) => {
    e.preventDefault()
    toast.success(`Application for ${modalState.data?.number} triggered!`)
    setModalState({ type: null, data: null })
  }

  const handleLogout = useCallback(() => {
    localStorage.clear()
    sessionStorage.clear()
    toast.success("Client ledger encrypted & session locked safely.")
    navigate('/login')
  }, [navigate])

  // handleCall - Opens call result modal
  const handleCall = useCallback((lead) => {
    if (!lead.phone) {
      toast.error(`No phone number found for ${lead.customerName}`)
      return
    }
    setCallLogForm({ duration: '', notes: '' })
    setModalState({ type: 'callModal', data: lead })
  }, [])

  // Log Call as Answered
  const handleCallAnswered = async () => {
    setCallLogSaving(true)
    const lead = modalState.data

    try {
      window.location.href = `tel:${lead.phone?.replace(/[^0-9+]/g, '')}`

      const result = await apiCall('/calls', 'POST', {
        caller_name: lead.customerName,
        phone:       lead.phone,
        call_type:   'outbound',
        duration:    callLogForm.duration ? parseInt(callLogForm.duration) : null,
        agent_name:  userProfile.name || 'Agent',
        notes:       callLogForm.notes || `Outbound call to ${lead.customerName} regarding ${lead.project}`,
        status:      'completed',
        called_at:   new Date().toISOString(),
      })

      if (result && result.status) {
        toast.success(`✅ Call to ${lead.customerName} logged as Completed in Calls tab!`)
        // STEP 13: Update local state instead of refetching all calls
        setCallsList(prev => [result.data, ...prev])
      } else {
        toast.warning('Call initiated but failed to log in database.')
      }
    } catch (err) {
      toast.error('Something went wrong while logging the call.')
    }

    setCallLogSaving(false)
    setModalState({ type: null, data: null })
    setCallLogForm({ duration: '', notes: '' })
  }

  // Log Call as Missed
  const handleCallMissed = async () => {
    setCallLogSaving(true)
    const lead = modalState.data

    try {
      const result = await apiCall('/calls', 'POST', {
        caller_name: lead.customerName,
        phone:       lead.phone,
        call_type:   'outbound',
        duration:    null,
        agent_name:  userProfile.name || 'Agent',
        notes:       callLogForm.notes || `Missed outbound call to ${lead.customerName}`,
        status:      'missed',
        called_at:   new Date().toISOString(),
      })

      if (result && result.status) {
        toast.warning(`⚠️ Call to ${lead.customerName} logged as Missed in Calls tab!`)
        // STEP 13: Update local state instead of refetching all calls
        setCallsList(prev => [result.data, ...prev])
      } else {
        toast.warning('Failed to log missed call in database.')
      }
    } catch (err) {
      toast.error('Something went wrong while logging the missed call.')
    }

    setCallLogSaving(false)
    setModalState({ type: null, data: null })
    setCallLogForm({ duration: '', notes: '' })
  }

  // Log Call as Pending
  const handleCallPending = async () => {
    setCallLogSaving(true)
    const lead = modalState.data

    try {
      const result = await apiCall('/calls', 'POST', {
        caller_name: lead.customerName,
        phone:       lead.phone,
        call_type:   'outbound',
        duration:    null,
        agent_name:  userProfile.name || 'Agent',
        notes:       callLogForm.notes || `Outbound call attempt to ${lead.customerName}`,
        status:      'pending',
        called_at:   new Date().toISOString(),
      })

      if (result && result.status) {
        window.location.href = `tel:${lead.phone?.replace(/[^0-9+]/g, '')}`
        toast.info(`📞 Calling ${lead.customerName}... Call logged as Pending.`)
        // STEP 13: Update local state instead of refetching all calls
        setCallsList(prev => [result.data, ...prev])
      } else {
        toast.warning('Call initiated but failed to log in database.')
        window.location.href = `tel:${lead.phone?.replace(/[^0-9+]/g, '')}`
      }
    } catch (err) {
      toast.error('Something went wrong.')
      window.location.href = `tel:${lead.phone?.replace(/[^0-9+]/g, '')}`
    }

    setCallLogSaving(false)
    setModalState({ type: null, data: null })
    setCallLogForm({ duration: '', notes: '' })
  }

  const handleWhatsApp = useCallback((lead) => {
    const message     = `Hi ${lead.customerName}, this is regarding your inquiry for ${lead.project}.`
    const whatsappUrl = `https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }, [])

  const handleEmail = useCallback((lead) => {
    setComposeEmailForm({
      to:      lead.email || '',
      subject: `Regarding your inquiry for ${lead.project || 'our project'}`,
      message: `Dear ${lead.customerName},\n\nThank you for your interest in ${lead.project || 'our project'}.\n\nWe would like to discuss further details with you.\n\nBest regards,\nMajestic Realties Team`,
    })
    setModalState({ type: 'composeEmail', data: lead })
  }, [])

  const handleSendEmail = async () => {
    if (!composeEmailForm.to || !composeEmailForm.subject || !composeEmailForm.message) {
      toast.error('Please fill all fields before sending.')
      return
    }
    setEmailSending(true)
    try {
      const result = await apiCall('/emails/send', 'POST', {
        to:       composeEmailForm.to,
        subject:  composeEmailForm.subject,
        message:  composeEmailForm.message,
        lead_id:  modalState.data?.id || null,
        customer: modalState.data?.customerName || '',
        status:   'sent',
      })
      if (result && result.status) {
        toast.success(`✅ Email sent to ${composeEmailForm.to} via Gmail!`)
        // STEP 13: Update local state instead of refetching all emails
        if (result.data) setEmailsList(prev => [result.data, ...prev])
        setModalState({ type: null, data: null })
        setComposeEmailForm({ to: '', subject: '', message: '' })
        setTimeout(() => {
          window.open('https://mail.google.com/mail/u/0/#sent', '_blank')
        }, 1000)
      } else {
        toast.error(result?.message || 'Failed to send email.')
      }
    } catch (err) {
      toast.error('Something went wrong while sending email.')
    }
    setEmailSending(false)
  }

  const handleSaveDraft = async () => {
    if (!composeEmailForm.to) {
      toast.error('Recipient email is required.')
      return
    }
    setEmailSending(true)
    try {
      const result = await apiCall('/emails/send', 'POST', {
        to:       composeEmailForm.to,
        subject:  composeEmailForm.subject || '(No Subject)',
        message:  composeEmailForm.message || '',
        lead_id:  modalState.data?.id      || null,
        customer: modalState.data?.customerName || '',
        status:   'draft',
      })
      if (result && result.status) {
        toast.info(`📝 Draft saved for ${composeEmailForm.to}`)
        // STEP 13: Update local state instead of refetching all emails
        if (result.data) setEmailsList(prev => [result.data, ...prev])
        setModalState({ type: null, data: null })
        setComposeEmailForm({ to: '', subject: '', message: '' })
      } else {
        toast.error(result?.message || 'Failed to save draft.')
      }
    } catch (err) {
      toast.error('Something went wrong while saving draft.')
    }
    setEmailSending(false)
  }

  const handleAddNote = useCallback((lead) => {
    setModalState({ type: 'addNote', data: lead })
  }, [])

  const handleViewDetails = useCallback((lead) => {
    setSelectedLead(lead)
    setModalState({ type: 'leadDetails', data: lead })
  }, [])

  const handleUpdateLead = useCallback((lead) => {
    setUpdateLeadForm({
      title:          lead.title          || '',
      customer_name:  lead.customerName   || lead.customer_name || '',
      phone:          lead.phone          || '',
      email:          lead.email          || '',
      project:        lead.project        || '',
      source:         lead.source         || '',
      budget:         lead.budget         || '',
      assigned_to:    lead.assignedTo     || lead.assigned_to || '',
      status:         lead.status         || 'new',
      notes:          lead.notes          || '',
      follow_up_date: lead.followUpDate   || lead.follow_up_date || '',
    })
    setModalState({ type: 'updateLead', data: lead })
  }, [])

  const handleUpdateLeadSubmit = async (e) => {
    e.preventDefault()
    const dbId   = modalState.data.id
    const result = await apiCall(`/leads/${dbId}`, 'PUT', updateLeadForm)
    if (result && result.status) {
      toast.success('Lead updated successfully!')
      // STEP 13: Update single record in local state - no refetch needed
      setCrmLeads(prev => prev.map(l =>
        l.id === dbId
          ? {
              ...l,
              title:         updateLeadForm.title,
              customerName:  updateLeadForm.customer_name,
              customer_name: updateLeadForm.customer_name,
              phone:         updateLeadForm.phone,
              email:         updateLeadForm.email,
              project:       updateLeadForm.project,
              source:        updateLeadForm.source,
              budget:        updateLeadForm.budget,
              assignedTo:    updateLeadForm.assigned_to,
              assigned_to:   updateLeadForm.assigned_to,
              status:        updateLeadForm.status,
              notes:         updateLeadForm.notes,
              followUpDate:  updateLeadForm.follow_up_date,
              follow_up_date:updateLeadForm.follow_up_date,
            }
          : l
      ))
      setModalState({ type: null, data: null })
    } else {
      toast.error(result?.message || 'Failed to update lead.')
    }
  }

  const handleDeleteLead = useCallback((lead) => {
    setModalState({ type: 'deleteLead', data: lead })
  }, [])

  const handleDeleteLeadConfirm = async () => {
    const dbId   = modalState.data.id
    const result = await apiCall(`/leads/${dbId}`, 'DELETE')
    if (result && result.status) {
      toast.success('Lead deleted successfully!')
      // STEP 13: Remove from local state - no refetch needed
      setCrmLeads(prev => prev.filter(l => l.id !== dbId))
      setDashboardStats(prev => ({ ...prev, total_leads: prev.total_leads - 1 }))
      setModalState({ type: null, data: null })
    } else {
      toast.error(result?.message || 'Failed to delete lead.')
    }
  }

  const handleNewLeadSubmit = async (e) => {
    e.preventDefault()
    if (!newLeadForm.customer_name) {
      toast.error('Customer name is required.')
      return
    }
    setNewLeadSubmitting(true)
    try {
      const result = await apiCall('/leads', 'POST', newLeadForm)
      if (result && result.status) {
        const addedLead = {
          ...result.data,
          customerName: result.data.customer_name,
          assignedTo:   result.data.assigned_to,
          createdDate:  result.data.created_date,
          followUpDate: result.data.follow_up_date,
        }
        // STEP 13: Add to local state - no refetch needed
        setCrmLeads(prev => [addedLead, ...prev])
        setDashboardStats(prev => ({ ...prev, total_leads: prev.total_leads + 1 }))
        toast.success(`✅ New lead "${newLeadForm.customer_name}" added successfully!`)
        setNewLeadForm({
          title: '', customer_name: '', phone: '', email: '', project: '',
          source: '', budget: '', assigned_to: '', status: 'new', notes: '',
          follow_up_date: '', created_date: new Date().toISOString().split('T')[0],
        })
        setModalState({ type: null, data: null })
        setActiveView('Leads')
      } else {
        toast.error(result?.message || 'Failed to add lead.')
      }
    } catch (err) {
      toast.error('Something went wrong while adding lead.')
    }
    setNewLeadSubmitting(false)
  }

  // --- NEW CONTACT SUBMIT ---
  const handleNewContactSubmit = async (e) => {
    e.preventDefault();
    setContactSubmitting(true);
    try {
      const result = await apiCall('/contacts', 'POST', newContactForm);
      if (result && result.status) {
        setContactsList(prev => [result.data, ...prev]);
        toast.success(`✅ Contact "${newContactForm.full_name}" added successfully!`);
        setNewContactForm({
          full_name: '', phone: '', email: '', company: '',
          designation: '', city: '', state: '', status: 'active'
        });
        setModalState({ type: null, data: null });
      } else {
        toast.error(result?.message || 'Failed to add contact.');
      }
    } catch (err) {
      toast.error('Something went wrong while adding contact.');
    } finally {
      setContactSubmitting(false);
    }
  };

  // =============================================
  // STEP 11: useMemo - Prevents re-filtering on every render
  // =============================================
  const filteredPlots = useMemo(() => plotInventory.filter(p =>
    p.project?.toLowerCase().includes(searchFilter.toLowerCase()) ||
    p.number?.toLowerCase().includes(searchFilter.toLowerCase())  ||
    p.size?.toLowerCase().includes(searchFilter.toLowerCase())
  ), [plotInventory, searchFilter])

  const filteredLeads = useMemo(() => crmLeads.filter(l =>
    l.customerName?.toLowerCase().includes(searchFilter.toLowerCase()) ||
    l.phone?.includes(searchFilter)                                     ||
    l.project?.toLowerCase().includes(searchFilter.toLowerCase())       ||
    l.email?.toLowerCase().includes(searchFilter.toLowerCase())
  ), [crmLeads, searchFilter])

  const filteredDeals = useMemo(() => dealsList.filter(d =>
  d.deal_name?.toLowerCase().includes(searchFilter.toLowerCase())   ||
  d.client_name?.toLowerCase().includes(searchFilter.toLowerCase()) ||
  d.project?.toLowerCase().includes(searchFilter.toLowerCase())
), [dealsList, searchFilter])

  const filteredEmails = useMemo(() => emailsList.filter(e =>
    e.from_email?.toLowerCase().includes(searchFilter.toLowerCase()) ||
    e.to_email?.toLowerCase().includes(searchFilter.toLowerCase())   ||
    e.subject?.toLowerCase().includes(searchFilter.toLowerCase())    ||
    e.status?.toLowerCase().includes(searchFilter.toLowerCase())
  ), [emailsList, searchFilter])

  const filteredCalls = useMemo(() => callsList.filter(c =>
    c.caller_name?.toLowerCase().includes(searchFilter.toLowerCase()) ||
    c.phone?.toLowerCase().includes(searchFilter.toLowerCase())       ||
    c.call_type?.toLowerCase().includes(searchFilter.toLowerCase())   ||
    c.status?.toLowerCase().includes(searchFilter.toLowerCase())      ||
    c.notes?.toLowerCase().includes(searchFilter.toLowerCase())
  ), [callsList, searchFilter])

  const filteredTasks = useMemo(() => tasksList.filter(t =>
    t.title?.toLowerCase().includes(searchFilter.toLowerCase())       ||
    t.assigned_to?.toLowerCase().includes(searchFilter.toLowerCase()) ||
    t.priority?.toLowerCase().includes(searchFilter.toLowerCase())    ||
    t.status?.toLowerCase().includes(searchFilter.toLowerCase())      ||
    t.related_to?.toLowerCase().includes(searchFilter.toLowerCase())
  ), [tasksList, searchFilter])

  const filteredContacts = useMemo(() => contactsList.filter(c =>
    c.first_name?.toLowerCase().includes(searchFilter.toLowerCase()) ||
    c.full_name?.toLowerCase().includes(searchFilter.toLowerCase())  ||
    c.last_name?.toLowerCase().includes(searchFilter.toLowerCase())  ||
    c.email?.toLowerCase().includes(searchFilter.toLowerCase())      ||
    c.phone?.toLowerCase().includes(searchFilter.toLowerCase())      ||
    c.company?.toLowerCase().includes(searchFilter.toLowerCase())    ||
    c.city?.toLowerCase().includes(searchFilter.toLowerCase())
  ), [contactsList, searchFilter])

  const filteredAccounts = useMemo(() => accountsList.filter(a =>
    a.account_name?.toLowerCase().includes(searchFilter.toLowerCase())  ||
    a.industry?.toLowerCase().includes(searchFilter.toLowerCase())      ||
    a.email?.toLowerCase().includes(searchFilter.toLowerCase())         ||
    a.phone?.toLowerCase().includes(searchFilter.toLowerCase())         ||
    a.city?.toLowerCase().includes(searchFilter.toLowerCase())          ||
    a.account_owner?.toLowerCase().includes(searchFilter.toLowerCase()) ||
    a.status?.toLowerCase().includes(searchFilter.toLowerCase())
  ), [accountsList, searchFilter])

  // useMemo for call status counts - avoids recalculating on every render
  const callStatusCounts = useMemo(() => ({
    answered: callsList.filter(c => c.status?.toLowerCase() === 'completed').length,
    missed:   callsList.filter(c => c.status?.toLowerCase() === 'missed').length,
    pending:  callsList.filter(c => c.status?.toLowerCase() === 'pending').length,
  }), [callsList])

  // useMemo for email status counts
  const emailStatusCounts = useMemo(() => ({
    sent:    emailsList.filter(e => e.status?.toLowerCase() === 'sent').length,
    pending: emailsList.filter(e => e.status?.toLowerCase() === 'pending').length,
    draft:   emailsList.filter(e => e.status?.toLowerCase() === 'draft').length,
  }), [emailsList])

  // Navigation Items - memoized
  const navigationItems = useMemo(() => [
    { icon: LayoutDashboard, label: 'Dashboard', view: 'Dashboard'                               },
    { icon: Users,           label: 'Leads',     view: 'Leads',     badge: crmLeads.length       },
    { icon: User,            label: 'Contacts',  view: 'Contacts',  badge: contactsList.length   },
    { icon: Briefcase,       label: 'Accounts',  view: 'Accounts',  badge: accountsList.length   },
    { icon: Target,          label: 'Deals',     view: 'Deals',     badge: dealsList.length      },
    { icon: ClipboardList,   label: 'Tasks',     view: 'Tasks',     badge: tasksList.length      },
    { icon: Calendar,        label: 'Calendar',  view: 'Calendar'                                },
    { icon: PhoneCall,       label: 'Calls',     view: 'Calls',     badge: callsList.length      },
    { icon: Mail,            label: 'Emails',    view: 'Emails',    badge: emailsList.length     },
    { icon: Activity,        label: 'Reports',   view: 'Reports'                                 },
  ], [crmLeads.length, contactsList.length, accountsList.length, dealsList.length, tasksList.length, callsList.length, emailsList.length])

  const secondaryNavItems = useMemo(() => [
    { icon: Layers,    label: 'Plot Assets',   view: 'Plot Assets',   badge: `${plotInventory.length} Units` },
    { icon: CreditCard,label: 'Ledger & EMIs', view: 'Ledger & EMIs'                                        },
    { icon: Calendar,  label: 'Site Tours',    view: 'Site Tours',    badge: upcomingTours.length            },
    { icon: LifeBuoy,  label: 'Support Desk',  view: 'Support Desk',  badge: '1 Open'                       },
    { icon: Gift,      label: 'Rewards Hub',   view: 'Rewards Hub'                                          },
    { icon: Settings,  label: 'Audit Vault',   view: 'Audit Vault'                                          },
  ], [plotInventory.length])

  const getEmailStatusConfig = useCallback((status) => {
    const s = status?.toLowerCase()
    const configs = {
      sent:    { label: 'Sent',    bg: '#ECFDF5', color: '#10B981' },
      pending: { label: 'Pending', bg: '#FFF7ED', color: '#F59E0B' },
      draft:   { label: 'Draft',   bg: '#EFF6FF', color: '#2563EB' },
      failed:  { label: 'Failed',  bg: '#FEF2F2', color: '#EF4444' },
    }
    return configs[s] || configs.sent
  }, [])

  return (
    <div className={styles.portalCanvas}>

      {/* SIDEBAR */}
      <motion.aside
        className={`${styles.sidebar} ${sidebarCollapsed ? styles.sidebarCollapsed : ''}`}
        animate={{ width: sidebarCollapsed ? '70px' : '260px' }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        <div className={styles.brandHeader}>
          <div className={styles.logoIcon}><Bot size={22} /></div>
          {!sidebarCollapsed && (
            <motion.div
              className={styles.brandTitle}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <span className={styles.name}>Majestic Realties CRM <strong></strong></span>
              <span className={styles.authBadge}>
                <ShieldCheck size={12} /> {userProfile.status.split(' ')[0].toUpperCase()}
              </span>
            </motion.div>
          )}
          <button
            className={styles.sidebarToggle}
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          >
            {sidebarCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        </div>

        <nav className={styles.navMenu}>
          {!sidebarCollapsed && <span className={styles.menuLabel}>CRM WORKSPACE</span>}
          {navigationItems.map(item => (
            <button
              key={item.label}
              onClick={() => setActiveView(item.view)}
              className={`${styles.navItem} ${activeView === item.view ? styles.navActive : ''}`}
            >
              <div className={styles.navLeft}>
                <item.icon size={18} className={styles.navIcon} />
                {!sidebarCollapsed && <span>{item.label}</span>}
              </div>
              {item.badge && !sidebarCollapsed && (
                <span className={styles.navBadge}>{item.badge}</span>
              )}
            </button>
          ))}

          {!sidebarCollapsed && (
            <span className={styles.menuLabel} style={{ marginTop: '24px' }}>
              PROPERTY MANAGEMENT
            </span>
          )}
          {secondaryNavItems.map(item => (
            <button
              key={item.label}
              onClick={() => setActiveView(item.view)}
              className={`${styles.navItem} ${activeView === item.view ? styles.navActive : ''}`}
            >
              <div className={styles.navLeft}>
                <item.icon size={18} className={styles.navIcon} />
                {!sidebarCollapsed && <span>{item.label}</span>}
              </div>
              {item.badge && !sidebarCollapsed && (
                <span className={styles.navBadge}>{item.badge}</span>
              )}
            </button>
          ))}
        </nav>

        <div className={styles.sessionStem}>
          {!sidebarCollapsed && (
            <div className={styles.sessionInfo}>
              <span className={styles.stemLabel}>SESSION</span>
              <span className={styles.jwtToken}>JWT Authorized</span>
            </div>
          )}
          <button onClick={handleLogout} className={styles.btnLogout}>
            <LogOut size={16} />
          </button>
        </div>
      </motion.aside>

      {/* MAIN AREA */}
      <main className={styles.workspaceCanvas}>
        <header className={styles.topBar}>
          <div className={styles.searchBox}>
            <Search size={18} className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search..."
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              className={styles.searchInput}
            />
          </div>
          <div className={styles.topActions}>
            <div
              className={styles.announcementPill}
              onClick={() => toast.info('RERA Registration Certificate available.')}
            >
              <span className={styles.pulseDot} />
              <span>ANNOUNCEMENT: Green Valley Phase II RERA Sanctioned</span>
            </div>
            <button
              onClick={() => setModalState({ type: 'newLead', data: null })}
              className={styles.btnQuickPrimary}
            >
              <Plus size={16} /> New Lead
            </button>
            <div
              className={styles.bellWrap}
              onClick={() => toast.info('Zero security alerts.')}
            >
              <Bell size={18} />
              <span className={styles.bellDot} />
            </div>
          </div>
        </header>

        <div className={styles.scrollCanvas}>
          {isLoading ? (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80%', color: '#64748b' }}>
              <Activity size={24} className="animate-spin" />
              <span style={{ marginLeft: 10 }}>Loading Data...</span>
            </div>
          ) : (
            <>
              {/* DASHBOARD VIEW */}
              {activeView === 'Dashboard' && (
                <div className={styles.viewDeck}>
                  <div className={styles.identityCard}>
                    <div className={styles.idCardLeft}>
                      <div className={styles.avatarLarge}>{userProfile.avatar}</div>
                      <div className={styles.profileDetails}>
                        <div className={styles.nameRow}>
                          <h2 className={styles.custName}>{userProfile.name}</h2>
                          <span className={styles.verifiedBadge}>✓ RERA Verified {userProfile.type}</span>
                        </div>
                        <div className={styles.metaRow}>
                          <span>ID: <strong>{userProfile.id}</strong></span> &bull;
                          <span>{userProfile.company}</span> &bull;
                          <span>{userProfile.email}</span>
                        </div>
                        <span className={styles.addressLine}>
                          <MapPin size={13} /> {userProfile.address}
                        </span>
                      </div>
                    </div>
                    <div className={styles.idCardRight}>
                      <span className={styles.planLabel}>ACTIVE MEMBERSHIP</span>
                      <h3 className={styles.planName}>{userProfile.plan}</h3>
                      <span className={styles.expiryDate}>
                        <Clock size={11} /> Valid until {userProfile.expiry}
                      </span>
                    </div>
                  </div>

                  <div className={styles.kpiRow}>
                    <div className={styles.kpiBox}>
                      <div className={styles.kpiTopRow}>
                        <span className={styles.kpiTitle}>TOTAL LEADS</span>
                        <Users size={20} style={{ color: '#2563EB', opacity: 0.6 }} />
                      </div>
                      <div className={styles.kpiVal}>{dashboardStats.total_leads}</div>
                      <span className={styles.kpiSub}>Total Inquiries</span>
                      <div className={styles.kpiBottomBar} style={{ backgroundColor: '#2563EB' }} />
                    </div>
                    <div className={styles.kpiBox}>
                      <div className={styles.kpiTopRow}>
                        <span className={styles.kpiTitle}>DEALS</span>
                        <Target size={20} style={{ color: '#8B5CF6', opacity: 0.6 }} />
                      </div>
                      <div className={styles.kpiVal}>{dealsList.length}</div>
                      <span className={styles.kpiSub}>Active Pipeline</span>
                      <div className={styles.kpiBottomBar} style={{ backgroundColor: '#8B5CF6' }} />
                    </div>
                    <div className={styles.kpiBox}>
                      <div className={styles.kpiTopRow}>
                        <span className={styles.kpiTitle}>NEW LEADS</span>
                        <UserPlus size={20} style={{ color: '#10B981', opacity: 0.6 }} />
                      </div>
                      <div className={styles.kpiVal}>2</div>
                      <span className={styles.kpiSub}>Today</span>
                      <div className={styles.kpiBottomBar} style={{ backgroundColor: '#10B981' }} />
                    </div>
                    <div className={styles.kpiBox}>
                      <div className={styles.kpiTopRow}>
                        <span className={styles.kpiTitle}>TOTAL REVENUE</span>
                        <DollarSign size={20} style={{ color: '#F59E0B', opacity: 0.6 }} />
                      </div>
                      <div className={styles.kpiVal}>₹ 95L</div>
                      <span className={styles.kpiSub}>Converted</span>
                      <div className={styles.kpiBottomBar} style={{ backgroundColor: '#F59E0B' }} />
                    </div>
                  </div>

                  <div className={styles.splitDeck}>
                    <div className={styles.panelCard}>
                      <div className={styles.panelHeader}>
                        <div><h3 className={styles.panelTitle}>Construction Updates</h3></div>
                      </div>
                      <div className={styles.progressDeck}>
                        <div className={styles.progressItem}>
                          <div className={styles.progMeta}>
                            <span className={styles.progLbl}>Sector-7 Roads</span>
                            <span className={styles.progPct}>92%</span>
                          </div>
                          <div className={styles.progBar}>
                            <div className={styles.progFill} style={{ width: '92%', backgroundColor: '#2563EB' }} />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className={styles.panelCard}>
                      <div className={styles.panelHeader}>
                        <div><h3 className={styles.panelTitle}>Recent Transactions</h3></div>
                      </div>
                      <div className={styles.quickTxnList}>
                        {financialLedger.length > 0 ? financialLedger.slice(0, 3).map(tx => (
                          <div key={tx.id} className={styles.quickTxnCard}>
                            <div className={styles.qTxnLeft}>
                              <span className={styles.qTxnItem}>{tx.item}</span>
                              <span className={styles.qTxnDate}>{tx.date}</span>
                            </div>
                            <div className={styles.qTxnRight}>
                              <span className={styles.qTxnAmt}>{tx.amount}</span>
                              <span className={styles.qTxnPill}>{tx.status}</span>
                            </div>
                          </div>
                        )) : (
                          <div className={styles.quickTxnCard}>
                            <span className={styles.qTxnItem}>No transactions found.</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* LEADS VIEW */}
              {activeView === 'Leads' && (
                <div className={styles.viewDeck}>
                  <div className={styles.sectionHeadingRow}>
                    <div>
                      <h2 className={styles.viewHeader}>Lead Management Center</h2>
                      <p className={styles.viewSubHeader}>Data loaded from MySQL Database.</p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <span className={styles.itemCounter}>{filteredLeads.length} Leads</span>
                      <button
                        onClick={() => setModalState({ type: 'newLead', data: null })}
                        className={styles.btnQuickPrimary}
                        style={{ padding: '8px 16px', fontSize: '13px' }}
                      >
                         <Plus size={16} /> New Lead
                      </button>
                    </div>
                  </div>
                  <div className={styles.leadsGrid}>
                    {filteredLeads.length > 0 ? filteredLeads.map((lead) => (
                      <LeadCard
                        key={lead.id}
                        lead={lead}
                        onCall={handleCall}
                        onWhatsApp={handleWhatsApp}
                        onEmail={handleEmail}
                        onAddNote={handleAddNote}
                        onViewDetails={handleViewDetails}
                        onUpdate={handleUpdateLead}
                        onDelete={handleDeleteLead}
                      />
                    )) : (
                      <div className={styles.comingSoonPlaceholder}>
                        <Users size={64} className={styles.placeholderIcon} />
                        <h2>No Leads Found</h2>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* CONTACTS VIEW */}
              {activeView === 'Contacts' && (
                <div className={styles.viewDeck}>
                  <div className={styles.sectionHeadingRow}>
                    <div>
                      <h2 className={styles.viewHeader}>Contacts Directory</h2>
                      <p className={styles.viewSubHeader}>All contacts loaded from MySQL Database.</p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <span className={styles.itemCounter}>{filteredContacts.length} Contacts</span>
                      <button 
                        onClick={() => setModalState({ type: 'newContact', data: null })}
                        className={styles.btnQuickPrimary}
                        style={{ padding: '8px 16px', fontSize: '13px' }}
                      >
                        <Plus size={16} /> Add Contact
                      </button>
                    </div>
                  </div>
                  <div className={styles.fullTableCard}>
                    <div className={styles.tableWrap}>
                      <table className={styles.table}>
                        <thead>
                          <tr>
                            <th>ID</th><th>FULL NAME</th><th>EMAIL</th><th>PHONE</th><th>COMPANY</th><th>DESIGNATION</th><th>CITY</th><th>SOURCE</th><th>STATUS</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredContacts.length > 0 ? (
                            filteredContacts.map((contact) => (
                              <tr key={contact.id} className={styles.tableRow}>
                                <td className={styles.cellTxnId}>{contact.id}</td>
                                <td className={styles.cellItemName}>
                                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#EFF6FF', color: '#2563EB', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 700, flexShrink: 0 }}>
                                      {(contact.full_name?.[0] || contact.name?.[0] || 'C')}
                                    </div>
                                    <span>{contact.full_name || contact.name || ''}</span>
                                  </div>
                                </td>
                                <td className={styles.cellItemName}>{contact.email || 'N/A'}</td>
                                <td className={styles.cellItemName}>{contact.phone || contact.mobile || 'N/A'}</td>
                                <td className={styles.cellItemName}>{contact.company || 'N/A'}</td>
                                <td className={styles.cellItemName}>{contact.designation || contact.job_title || 'N/A'}</td>
                                <td className={styles.cellDate}>{contact.city || contact.location || 'N/A'}</td>
                                <td className={styles.cellItemName}>
                                  <span style={{ backgroundColor: '#F5F3FF', color: '#8B5CF6', padding: '3px 8px', borderRadius: '12px', fontSize: '12px', fontWeight: 600 }}>
                                    {contact.source || 'Direct'}
                                  </span>
                                </td>
                                <td>
                                  <span className={styles.statusSettled} style={{ backgroundColor: contact.status === 'active' || contact.status === 'Active' ? '#ECFDF5' : contact.status === 'inactive' || contact.status === 'Inactive' ? '#FEF2F2' : '#FFF7ED', color: contact.status === 'active' || contact.status === 'Active' ? '#10B981' : contact.status === 'inactive' || contact.status === 'Inactive' ? '#EF4444' : '#F59E0B', padding: '4px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: 600, textTransform: 'capitalize' }}>
                                    {contact.status || 'Active'}
                                  </span>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr className={styles.tableRow}>
                              <td colSpan="9" style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                                  <User size={40} style={{ opacity: 0.3 }} />
                                  <span>No Contact Records Found</span>
                                </div>
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* ACCOUNTS VIEW */}
              {activeView === 'Accounts' && (
                <div className={styles.viewDeck}>
                  <div className={styles.sectionHeadingRow}>
                    <div>
                      <h2 className={styles.viewHeader}>Accounts Directory</h2>
                      <p className={styles.viewSubHeader}>All company accounts loaded from MySQL Database.</p>
                    </div>
                    <span className={styles.itemCounter}>{filteredAccounts.length} Accounts</span>
                  </div>
                  <div className={styles.fullTableCard}>
                    <div className={styles.tableWrap}>
                      <table className={styles.table}>
                        <thead>
                          <tr>
                            <th>ID</th><th>ACCOUNT NAME</th><th>INDUSTRY</th><th>EMAIL</th><th>PHONE</th><th>CITY</th><th>ANNUAL REVENUE</th><th>ACCOUNT OWNER</th><th>STATUS</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredAccounts.length > 0 ? (
                            filteredAccounts.map((account) => (
                              <tr key={account.id} className={styles.tableRow}>
                                <td className={styles.cellTxnId}>{account.id}</td>
                                <td className={styles.cellItemName}>
                                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <div style={{ width: '34px', height: '34px', borderRadius: '8px', backgroundColor: '#F5F3FF', color: '#8B5CF6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: 700, flexShrink: 0 }}>
                                      {account.account_name?.[0]?.toUpperCase() || 'A'}
                                    </div>
                                    <div>
                                      <div style={{ fontWeight: 600, color: '#0f172a', fontSize: '13px' }}>{account.account_name || 'N/A'}</div>
                                      <div style={{ fontSize: '11px', color: '#94a3b8' }}>{account.website || ''}</div>
                                    </div>
                                  </div>
                                </td>
                                <td className={styles.cellItemName}>
                                  <span style={{ backgroundColor: '#EFF6FF', color: '#2563EB', padding: '3px 8px', borderRadius: '12px', fontSize: '12px', fontWeight: 600 }}>
                                    {account.industry || 'N/A'}
                                  </span>
                                </td>
                                <td className={styles.cellItemName}>{account.email || 'N/A'}</td>
                                <td className={styles.cellItemName}>{account.phone || account.mobile || 'N/A'}</td>
                                <td className={styles.cellDate}>{account.city || account.location || 'N/A'}</td>
                                <td className={styles.cellAmt}><span style={{ fontWeight: 700, color: '#0f172a' }}>{account.annual_revenue || account.revenue || 'N/A'}</span></td>
                                <td className={styles.cellItemName}>{account.account_owner || account.owner || 'N/A'}</td>
                                <td>
                                  <span className={styles.statusSettled} style={{ backgroundColor: account.status === 'active' || account.status === 'Active' ? '#ECFDF5' : account.status === 'inactive' || account.status === 'Inactive' ? '#FEF2F2' : '#FFF7ED', color: account.status === 'active' || account.status === 'Active' ? '#10B981' : account.status === 'inactive' || account.status === 'Inactive' ? '#EF4444' : '#F59E0B', padding: '4px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: 600, textTransform: 'capitalize' }}>
                                    {account.status || 'Active'}
                                  </span>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr className={styles.tableRow}>
                              <td colSpan="9" style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                                  <Briefcase size={40} style={{ opacity: 0.3 }} />
                                  <span>No Account Records Found</span>
                                </div>
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* DEALS VIEW */}
{activeView === 'Deals' && (
  <div className={styles.viewDeck}>
    <div className={styles.sectionHeadingRow}>
      <div>
        <h2 className={styles.viewHeader}>Deal Pipeline</h2>
        <p className={styles.viewSubHeader}>Track revenue opportunities and closing stages.</p>
      </div>
      <span className={styles.itemCounter}>{filteredDeals.length} Deals</span>
    </div>
    <div className={styles.leadsGrid}>
      {filteredDeals.length > 0 ? (
        filteredDeals.map((deal) => (
          <DealCard key={deal.id} deal={deal} />
        ))
      ) : (
        <div className={styles.comingSoonPlaceholder}>
          <Activity size={64} className={styles.placeholderIcon} />
          <h2>No Deals Found</h2>
          {searchFilter ? (
            <p>No results matching "{searchFilter}"</p>
          ) : dealsList.length === 0 ? (
            <p>No deals in database. Add deals via backend.</p>
          ) : (
            <p>All deals filtered out. Try adjusting search.</p>
          )}
        </div>
      )}
    </div>
  </div>
)}

              {/* EMAILS VIEW */}
              {activeView === 'Emails' && (
                <div className={styles.viewDeck}>
                  <div className={styles.sectionHeadingRow}>
                    <div>
                      <h2 className={styles.viewHeader}>Email Center</h2>
                      <p className={styles.viewSubHeader}>All sent, pending and draft emails loaded from database.</p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                      {/* Using memoized counts */}
                      <span style={{ backgroundColor: '#ECFDF5', color: '#10B981', padding: '4px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: 600 }}>
                        ✓ Sent: {emailStatusCounts.sent}
                      </span>
                      <span style={{ backgroundColor: '#FFF7ED', color: '#F59E0B', padding: '4px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: 600 }}>
                        ⏳ Pending: {emailStatusCounts.pending}
                      </span>
                      <span style={{ backgroundColor: '#EFF6FF', color: '#2563EB', padding: '4px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: 600 }}>
                        📝 Draft: {emailStatusCounts.draft}
                      </span>
                      <span className={styles.itemCounter}>{filteredEmails.length} Emails</span>
                    </div>
                  </div>
                  <div className={styles.fullTableCard}>
                    <div className={styles.tableWrap}>
                      <table className={styles.table}>
                        <thead>
                          <tr>
                            <th>ID</th><th>FROM</th><th>TO</th><th>SUBJECT</th><th>MESSAGE PREVIEW</th><th>DATE</th><th>STATUS</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredEmails.length > 0 ? (
                            filteredEmails.map((email) => {
                              const statusCfg = getEmailStatusConfig(email.status)
                              return (
                                <tr key={email.id} className={styles.tableRow}>
                                  <td className={styles.cellTxnId}>{email.id}</td>
                                  <td className={styles.cellItemName}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                      <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: '#F5F3FF', color: '#8B5CF6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 700, flexShrink: 0 }}>
                                        {(email.sender_email || email.sender || 'A')[0].toUpperCase()}
                                      </div>
                                      <span style={{ fontSize: '13px' }}>{email.sender_name || email.sender || 'N/A'}</span>
                                    </div>
                                  </td>
                                  <td className={styles.cellItemName}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                      <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: '#EFF6FF', color: '#2563EB', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 700, flexShrink: 0 }}>
                                        {(email.recipient_email || email.to || 'U')[0].toUpperCase()}
                                      </div>
                                      <span style={{ fontSize: '13px' }}>{email.recipient_name || email.recipient_email || email.to || 'N/A'}</span>
                                    </div>
                                  </td>
                                  <td className={styles.cellItemName}><span style={{ fontWeight: 600, color: '#0f172a', fontSize: '13px' }}>{email.subject || 'No Subject'}</span></td>
                                  <td className={styles.cellItemName} style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: '#64748b', fontSize: '12px' }} title={email.body || email.message || ''}>
                                    {email.body || email.message || '—'}
                                  </td>
                                  <td className={styles.cellDate}>{email.sent_at || email.created_at || email.date || 'N/A'}</td>
                                  <td>
                                    <span className={styles.statusSettled} style={{ backgroundColor: statusCfg.bg, color: statusCfg.color, padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 600, textTransform: 'capitalize', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                                      {email.status?.toLowerCase() === 'sent'   && '✓ '}
                                      {email.status?.toLowerCase() === 'pending' && '⏳ '}
                                      {email.status?.toLowerCase() === 'draft'   && '📝 '}
                                      {email.status?.toLowerCase() === 'failed'  && '✗ '}
                                      {statusCfg.label}
                                    </span>
                                  </td>
                                </tr>
                              )
                            })
                          ) : (
                            <tr className={styles.tableRow}>
                              <td colSpan="7" style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                                  <Mail size={40} style={{ opacity: 0.3 }} />
                                  <span>No Email Records Found</span>
                                </div>
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* CALLS VIEW */}
              {activeView === 'Calls' && (
                <div className={styles.viewDeck}>
                  <div className={styles.sectionHeadingRow}>
                    <div>
                      <h2 className={styles.viewHeader}>Call Logs Center</h2>
                      <p className={styles.viewSubHeader}>All inbound and outbound call records loaded from database.</p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                      {/* Using memoized counts */}
                      <span style={{ backgroundColor: '#ECFDF5', color: '#10B981', padding: '4px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: 600 }}>
                        ✅ Answered: {callStatusCounts.answered}
                      </span>
                      <span style={{ backgroundColor: '#FEF2F2', color: '#EF4444', padding: '4px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: 600 }}>
                        ❌ Missed: {callStatusCounts.missed}
                      </span>
                      <span style={{ backgroundColor: '#FFF7ED', color: '#F59E0B', padding: '4px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: 600 }}>
                        ⏳ Pending: {callStatusCounts.pending}
                      </span>
                      <span className={styles.itemCounter}>{filteredCalls.length} Calls</span>
                    </div>
                  </div>
                  <div className={styles.fullTableCard}>
                    <div className={styles.tableWrap}>
                      <table className={styles.table}>
                        <thead>
                          <tr>
                            <th>ID</th><th>CALLER NAME</th><th>PHONE</th><th>CALL TYPE</th><th>DURATION</th><th>DATE & TIME</th><th>AGENT</th><th>NOTES</th><th>STATUS</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredCalls.length > 0 ? (
                            filteredCalls.map((call) => (
                              <tr key={call.id} className={styles.tableRow}>
                                <td className={styles.cellTxnId}>{call.id}</td>
                                <td className={styles.cellItemName}>{call.caller_name || call.callerName || 'N/A'}</td>
                                <td className={styles.cellItemName}>{call.phone || call.mobile || 'N/A'}</td>
                                <td className={styles.cellItemName}>
                                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', backgroundColor: call.call_type === 'inbound' || call.call_type === 'Inbound' ? '#EFF6FF' : '#F5F3FF', color: call.call_type === 'inbound' || call.call_type === 'Inbound' ? '#2563EB' : '#8B5CF6', padding: '3px 8px', borderRadius: '12px', fontSize: '12px', fontWeight: 600, textTransform: 'capitalize' }}>
                                    {call.call_type === 'inbound' || call.call_type === 'Inbound' ? <Phone size={11} /> : <PhoneCall size={11} />}
                                    {call.call_type || 'N/A'}
                                  </span>
                                </td>
                                <td className={styles.cellDate}>{call.duration ? `${call.duration} min` : call.call_duration ? `${call.call_duration} min` : 'N/A'}</td>
                                <td className={styles.cellDate}>{call.called_at || call.call_date || call.created_at || call.date || 'N/A'}</td>
                                <td className={styles.cellItemName}>{call.agent_name || call.agentName || call.assigned_to || 'N/A'}</td>
                                <td className={styles.cellItemName} style={{ maxWidth: '160px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={call.notes || call.remarks || ''}>{call.notes || call.remarks || '—'}</td>
                                <td>
                                  <span className={styles.statusSettled} style={{ backgroundColor: call.status === 'completed' || call.status === 'Completed' ? '#ECFDF5' : call.status === 'missed' || call.status === 'Missed' ? '#FEF2F2' : '#FFF7ED', color: call.status === 'completed' || call.status === 'Completed' ? '#10B981' : call.status === 'missed' || call.status === 'Missed' ? '#EF4444' : '#F59E0B', padding: '4px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: 600, textTransform: 'capitalize', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                                    {(call.status === 'completed' || call.status === 'Completed') && '✅ '}
                                    {(call.status === 'missed'    || call.status === 'Missed')    && '❌ '}
                                    {(call.status === 'pending'   || call.status === 'Pending')   && '⏳ '}
                                    {call.status === 'completed' || call.status === 'Completed' ? 'Answered'
                                      : call.status === 'missed' || call.status === 'Missed' ? 'Missed'
                                      : call.status || 'N/A'}
                                  </span>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr className={styles.tableRow}>
                              <td colSpan="9" style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                                  <PhoneCall size={40} style={{ opacity: 0.3 }} />
                                  <span>No Call Records Found</span>
                                  <span style={{ fontSize: '13px' }}>Make calls from Lead Cards to log them here.</span>
                                </div>
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* TASKS VIEW */}
              {activeView === 'Tasks' && (
                <div className={styles.viewDeck}>
                  <div className={styles.sectionHeadingRow}>
                    <div>
                      <h2 className={styles.viewHeader}>Task Management Center</h2>
                      <p className={styles.viewSubHeader}>All assigned and pending tasks loaded from database.</p>
                    </div>
                    <span className={styles.itemCounter}>{filteredTasks.length} Tasks</span>
                  </div>
                  <div className={styles.fullTableCard}>
                    <div className={styles.tableWrap}>
                      <table className={styles.table}>
                        <thead>
                          <tr>
                            <th>ID</th><th>TASK TITLE</th><th>ASSIGNED TO</th><th>RELATED TO</th><th>PRIORITY</th><th>DUE DATE</th><th>DESCRIPTION</th><th>STATUS</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredTasks.length > 0 ? (
                            filteredTasks.map((task) => (
                              <tr key={task.id} className={styles.tableRow}>
                                <td className={styles.cellTxnId}>{task.id}</td>
                                <td className={styles.cellItemName}>{task.title || 'N/A'}</td>
                                <td className={styles.cellItemName}>{task.assigned_to || task.assignedTo || 'N/A'}</td>
                                <td className={styles.cellItemName}>{task.related_to || task.relatedTo || 'N/A'}</td>
                                <td className={styles.cellItemName}>
                                  <span style={{ backgroundColor: task.priority === 'high' || task.priority === 'High' ? '#FEF2F2' : task.priority === 'medium' || task.priority === 'Medium' ? '#FFF7ED' : '#ECFDF5', color: task.priority === 'high' || task.priority === 'High' ? '#EF4444' : task.priority === 'medium' || task.priority === 'Medium' ? '#F59E0B' : '#10B981', padding: '3px 8px', borderRadius: '12px', fontSize: '12px', fontWeight: 600, textTransform: 'capitalize' }}>
                                    {task.priority || 'N/A'}
                                  </span>
                                </td>
                                <td className={styles.cellDate}>{task.due_date || task.dueDate || 'N/A'}</td>
                                <td className={styles.cellItemName} style={{ maxWidth: '180px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={task.description || ''}>{task.description || '—'}</td>
                                <td>
                                  <span className={styles.statusSettled} style={{ backgroundColor: task.status === 'completed' || task.status === 'Completed' ? '#ECFDF5' : task.status === 'in_progress' || task.status === 'In Progress' ? '#EFF6FF' : task.status === 'pending' || task.status === 'Pending' ? '#FFF7ED' : '#FEF2F2', color: task.status === 'completed' || task.status === 'Completed' ? '#10B981' : task.status === 'in_progress' || task.status === 'In Progress' ? '#2563EB' : task.status === 'pending' || task.status === 'Pending' ? '#F59E0B' : '#EF4444', padding: '4px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: 600, textTransform: 'capitalize' }}>
                                    {task.status || 'N/A'}
                                  </span>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr className={styles.tableRow}>
                              <td colSpan="8" style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                                  <ClipboardList size={40} style={{ opacity: 0.3 }} />
                                  <span>No Task Records Found</span>
                                </div>
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* PLOTS VIEW */}
              {activeView === 'Plot Assets' && (
                <div className={styles.viewDeck}>
                  <div className={styles.sectionHeadingRow}>
                    <div><h2 className={styles.viewHeader}>Physical Plot Asset Bank</h2></div>
                    <span className={styles.itemCounter}>{filteredPlots.length} Parcels</span>
                  </div>
                  <div className={styles.plotGrid}>
                    {filteredPlots.length > 0 ? filteredPlots.map((plot, i) => (
                      <motion.div key={plot.id} className={styles.plotCard} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                        <div className={styles.plotCardBody}>
                          <h3 className={styles.plotNum}>{plot.number || plot.plot_number}</h3>
                          <span className={styles.plotProjName}>{plot.project || plot.project_name}</span>
                          <button onClick={() => setModalState({ type: 'applyPlot', data: plot })} className={styles.btnApplyNow}>Apply Now</button>
                        </div>
                      </motion.div>
                    )) : (
                      <div className={styles.comingSoonPlaceholder}>
                        <Activity size={64} className={styles.placeholderIcon} />
                        <h2>No Plot Data</h2>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* LEDGER VIEW */}
              {activeView === 'Ledger & EMIs' && (
                <div className={styles.viewDeck}>
                  <div className={styles.sectionHeadingRow}>
                    <h2 className={styles.viewHeader}>Orders & Transaction History</h2>
                  </div>
                  <div className={styles.fullTableCard}>
                    <div className={styles.tableWrap}>
                      <table className={styles.table}>
                        <thead>
                          <tr>
                            <th>ID</th><th>ITEM</th><th>DATE</th><th>AMOUNT</th><th>STATUS</th>
                          </tr>
                        </thead>
                        <tbody>
                          {financialLedger.length > 0 ? financialLedger.map(tx => (
                            <tr key={tx.id} className={styles.tableRow}>
                              <td className={styles.cellTxnId}>{tx.id}</td>
                              <td className={styles.cellItemName}>{tx.item}</td>
                              <td className={styles.cellDate}>{tx.date}</td>
                              <td className={styles.cellAmt}>{tx.amount}</td>
                              <td><span className={styles.statusSettled}>{tx.status}</span></td>
                            </tr>
                          )) : (
                            <tr className={styles.tableRow}>
                              <td colSpan="5" style={{ textAlign: 'center', padding: '20px' }}>No Transaction Data Available</td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* PLACEHOLDER VIEWS */}
              {['Calendar', 'Reports', 'Site Tours', 'Support Desk', 'Rewards Hub', 'Audit Vault'].includes(activeView) && (
                <div className={styles.viewDeck}>
                  <div className={styles.comingSoonPlaceholder}>
                    <Activity size={64} className={styles.placeholderIcon} />
                    <h2>{activeView} Module</h2>
                    <p>Interface ready. Connect specific API endpoint for data.</p>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </main>

      {/* MODALS */}
      <AnimatePresence>
        {modalState.type && (
          <div className={styles.modalBackdrop} onClick={() => setModalState({ type: null, data: null })}>
            <motion.div
              className={styles.modalCard}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              onClick={(e) => e.stopPropagation()}
              style={
                modalState.type === 'updateLead'   ? { maxWidth: '600px', width: '95%' } :
                modalState.type === 'newLead'      ? { maxWidth: '600px', width: '95%' } :
                modalState.type === 'newContact'   ? { maxWidth: '600px', width: '95%' } :
                modalState.type === 'composeEmail' ? { maxWidth: '560px', width: '95%' } :
                modalState.type === 'callModal'    ? { maxWidth: '440px', width: '95%' } :
                {}
              }
            >
              <div className={styles.modalTopHeader}>
                <h3 className={styles.modalTitleText}>
                  {modalState.type === 'applyPlot'   && `Apply for ${modalState.data?.number || modalState.data?.plot_number}`}
                  {modalState.type === 'addNote'      && `Note for ${modalState.data?.customerName}`}
                  {modalState.type === 'leadDetails'  && `Details: ${modalState.data?.customerName}`}
                  {modalState.type === 'ticket'       && 'Raise Ticket'}
                  {modalState.type === 'updateLead'   && `Update Lead: ${modalState.data?.customerName}`}
                  {modalState.type === 'deleteLead'   && 'Delete Lead'}
                  {modalState.type === 'composeEmail' && `Compose Email — ${modalState.data?.customerName}`}
                  {modalState.type === 'newLead'      && 'Add New Lead'}
                  {modalState.type === 'newContact'   && 'Add New Contact'}
                  {modalState.type === 'callModal'    && `Call ${modalState.data?.customerName}`}
                </h3>
                <button onClick={() => setModalState({ type: null, data: null })} className={styles.btnModalCloseX}>
                  <X size={18} />
                </button>
              </div>

              {/* Apply Plot Modal */}
              {modalState.type === 'applyPlot' && (
                <form onSubmit={handleApplyPlotSubmit} className={styles.modalFormBody}>
                  <div className={styles.mInputGroup}>
                    <label>PAN</label>
                    <input type="text" value={applicationData.applicantPAN} onChange={e => setApplicationData(prev => ({ ...prev, applicantPAN: e.target.value }))} required />
                  </div>
                  <button type="submit" className={styles.btnModalSubmitConvert}>Submit Application</button>
                </form>
              )}

              {/* Add Note Modal */}
              {modalState.type === 'addNote' && (
                <form onSubmit={async (e) => {
                  e.preventDefault()
                  const note = e.target.elements.note.value
                  const dbId = modalState.data.id
                  const res  = await apiCall(`/leads/${dbId}/note`, 'POST', { notes: note })
                  if (res && res.status) {
                    toast.success("Note Saved!")
                    setModalState({ type: null, data: null })
                  }
                }} className={styles.modalFormBody}>
                  <div className={styles.mInputGroup}>
                    <label>Note</label>
                    <textarea name="note" rows="4" required></textarea>
                  </div>
                  <button type="submit" className={styles.btnModalSubmitConvert}>Save Note</button>
                </form>
              )}

              {/* Lead Details Modal */}
              {modalState.type === 'leadDetails' && modalState.data && (
                <div className={styles.leadDetailsModal}>
                  <div className={styles.leadDetailHeader}>
                    <div className={styles.leadDetailAvatar}>
                      {modalState.data.customerName.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <h2>{modalState.data.customerName}</h2>
                      <p className={styles.leadDetailSub}>{modalState.data.email}</p>
                    </div>
                  </div>
                  <div className={styles.leadDetailBody}>
                    <div className={styles.leadDetailRow}>
                      <span className={styles.ldLabel}>Status:</span>
                      <span className={styles.ldValue}>{modalState.data.status}</span>
                    </div>
                    <div className={styles.leadDetailRow}>
                      <span className={styles.ldLabel}>Budget:</span>
                      <span className={styles.ldValue}>{modalState.data.budget}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Ticket Modal */}
              {modalState.type === 'ticket' && (
                <form onSubmit={(e) => { e.preventDefault(); toast.success('Ticket Created'); setModalState({ type: null, data: null }); }} className={styles.modalFormBody}>
                  <div className={styles.mInputGroup}>
                    <label>Query Subject</label>
                    <input type="text" required />
                  </div>
                  <button type="submit" className={styles.btnModalSubmitConvert}>Submit Ticket</button>
                </form>
              )}

              {/* Update Lead Modal */}
              {modalState.type === 'updateLead' && (
                <form onSubmit={handleUpdateLeadSubmit} className={styles.modalFormBody}>
                  <div className={styles.mInputGroup}>
                    <label>Title</label>
                    <input type="text" value={updateLeadForm.title} onChange={e => setUpdateLeadForm(prev => ({ ...prev, title: e.target.value }))} />
                  </div>
                  <div className={styles.mInputGroup}>
                    <label>Customer Name <span style={{ color: '#EF4444' }}>*</span></label>
                    <input type="text" value={updateLeadForm.customer_name} onChange={e => setUpdateLeadForm(prev => ({ ...prev, customer_name: e.target.value }))} required />
                  </div>
                  <div className={styles.mInputGroup}>
                    <label>Phone</label>
                    <input type="text" value={updateLeadForm.phone} onChange={e => setUpdateLeadForm(prev => ({ ...prev, phone: e.target.value }))} />
                  </div>
                  <div className={styles.mInputGroup}>
                    <label>Email</label>
                    <input type="email" value={updateLeadForm.email} onChange={e => setUpdateLeadForm(prev => ({ ...prev, email: e.target.value }))} />
                  </div>
                  <div className={styles.mInputGroup}>
                    <label>Project</label>
                    <input type="text" value={updateLeadForm.project} onChange={e => setUpdateLeadForm(prev => ({ ...prev, project: e.target.value }))} />
                  </div>
                  <div className={styles.mInputGroup}>
                    <label>Source</label>
                    <input type="text" value={updateLeadForm.source} onChange={e => setUpdateLeadForm(prev => ({ ...prev, source: e.target.value }))} />
                  </div>
                  <div className={styles.mInputGroup}>
                    <label>Budget</label>
                    <input type="text" value={updateLeadForm.budget} onChange={e => setUpdateLeadForm(prev => ({ ...prev, budget: e.target.value }))} />
                  </div>
                  <div className={styles.mInputGroup}>
                    <label>Assigned To</label>
                    <input type="text" value={updateLeadForm.assigned_to} onChange={e => setUpdateLeadForm(prev => ({ ...prev, assigned_to: e.target.value }))} />
                  </div>
                  <div className={styles.mInputGroup}>
                    <label>Status</label>
                    <select value={updateLeadForm.status} onChange={e => setUpdateLeadForm(prev => ({ ...prev, status: e.target.value }))} style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1.5px solid #e2e8f0', fontSize: '14px', color: '#0f172a', backgroundColor: '#fff', outline: 'none' }}>
                      <option value="new">New Lead</option>
                      <option value="contacted">Contacted</option>
                      <option value="interested">Interested</option>
                      <option value="not_interested">Not Interested</option>
                      <option value="converted">Converted</option>
                    </select>
                  </div>
                  <div className={styles.mInputGroup}>
                    <label>Follow-up Date</label>
                    <input type="date" value={updateLeadForm.follow_up_date} onChange={e => setUpdateLeadForm(prev => ({ ...prev, follow_up_date: e.target.value }))} />
                  </div>
                  <div className={styles.mInputGroup}>
                    <label>Notes</label>
                    <textarea rows="3" value={updateLeadForm.notes} onChange={e => setUpdateLeadForm(prev => ({ ...prev, notes: e.target.value }))}></textarea>
                  </div>
                  <button type="submit" className={styles.btnModalSubmitConvert}>
                    <RefreshCw size={15} style={{ marginRight: '6px' }} />
                    Update Lead
                  </button>
                </form>
              )}

              {/* Delete Lead Modal */}
              {modalState.type === 'deleteLead' && modalState.data && (
                <div className={styles.modalFormBody}>
                  <div style={{ textAlign: 'center', padding: '20px 0' }}>
                    <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: '#FEF2F2', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                      <Trash2 size={28} style={{ color: '#EF4444' }} />
                    </div>
                    <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>Delete Lead?</h3>
                    <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '8px' }}>You are about to permanently delete:</p>
                    <p style={{ fontSize: '15px', fontWeight: 600, color: '#EF4444', marginBottom: '24px' }}>{modalState.data.customerName}</p>
                    <p style={{ fontSize: '13px', color: '#94a3b8', marginBottom: '28px' }}>This action cannot be undone.</p>
                    <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                      <button onClick={() => setModalState({ type: null, data: null })} style={{ padding: '10px 24px', borderRadius: '8px', border: '1.5px solid #e2e8f0', backgroundColor: '#fff', color: '#64748b', fontSize: '14px', fontWeight: 600, cursor: 'pointer' }}>
                        Cancel
                      </button>
                      <button onClick={handleDeleteLeadConfirm} style={{ padding: '10px 24px', borderRadius: '8px', border: 'none', backgroundColor: '#EF4444', color: '#fff', fontSize: '14px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Trash2 size={15} /> Yes, Delete Lead
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Compose Email Modal */}
              {modalState.type === 'composeEmail' && (
                <div className={styles.modalFormBody}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px', padding: '8px 12px', backgroundColor: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: '8px' }}>
                    <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'linear-gradient(135deg, #EA4335, #FBBC05, #34A853, #4285F4)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', color: '#fff', fontWeight: 700, flexShrink: 0 }}>G</div>
                    <span style={{ fontSize: '12px', color: '#15803D', fontWeight: 600 }}>This email will be delivered to Gmail inbox via Laravel Mail (SMTP)</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 14px', backgroundColor: '#F8FAFC', borderRadius: '10px', marginBottom: '14px', border: '1px solid #e2e8f0' }}>
                    <div style={{ width: '34px', height: '34px', borderRadius: '50%', backgroundColor: '#EFF6FF', color: '#2563EB', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: 700, flexShrink: 0 }}>
                      {modalState.data?.customerName?.split(' ').map(n => n[0]).join('') || 'U'}
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, color: '#0f172a', fontSize: '14px' }}>{modalState.data?.customerName}</div>
                      <div style={{ fontSize: '12px', color: '#64748b' }}>{modalState.data?.project} • {modalState.data?.phone}</div>
                    </div>
                  </div>
                  <div className={styles.mInputGroup}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Mail size={13} /> To (Gmail Recipient)</label>
                    <input type="email" value={composeEmailForm.to} onChange={e => setComposeEmailForm(prev => ({ ...prev, to: e.target.value }))} style={{ backgroundColor: '#F8FAFC', fontWeight: 600 }} placeholder="recipient@gmail.com" />
                  </div>
                  <div className={styles.mInputGroup}>
                    <label>Subject <span style={{ color: '#EF4444' }}>*</span></label>
                    <input type="text" value={composeEmailForm.subject} onChange={e => setComposeEmailForm(prev => ({ ...prev, subject: e.target.value }))} placeholder="Enter email subject..." />
                  </div>
                  <div className={styles.mInputGroup}>
                    <label>Message <span style={{ color: '#EF4444' }}>*</span></label>
                    <textarea rows="6" value={composeEmailForm.message} onChange={e => setComposeEmailForm(prev => ({ ...prev, message: e.target.value }))} placeholder="Type your message here..." style={{ resize: 'vertical', lineHeight: '1.6' }}></textarea>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '12px', color: '#64748b' }}>Appears in Dashboard as:</span>
                    <span style={{ backgroundColor: '#ECFDF5', color: '#10B981', padding: '2px 8px', borderRadius: '12px', fontSize: '11px', fontWeight: 600 }}>✓ Sent</span>
                    <span style={{ color: '#94a3b8', fontSize: '12px' }}>or</span>
                    <span style={{ backgroundColor: '#EFF6FF', color: '#2563EB', padding: '2px 8px', borderRadius: '12px', fontSize: '11px', fontWeight: 600 }}>📝 Draft</span>
                  </div>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button type="button" onClick={handleSaveDraft} disabled={emailSending} style={{ flex: 1, padding: '11px 16px', borderRadius: '8px', border: '1.5px solid #2563EB', backgroundColor: '#fff', color: '#2563EB', fontSize: '14px', fontWeight: 600, cursor: emailSending ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', opacity: emailSending ? 0.6 : 1 }}>
                      <FileText size={15} />
                      {emailSending ? 'Saving...' : 'Save Draft'}
                    </button>
                    <button type="button" onClick={handleSendEmail} disabled={emailSending} style={{ flex: 2, padding: '11px 16px', borderRadius: '8px', border: 'none', background: emailSending ? '#94a3b8' : 'linear-gradient(135deg, #EA4335 0%, #4285F4 100%)', color: '#fff', fontSize: '14px', fontWeight: 600, cursor: emailSending ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', boxShadow: emailSending ? 'none' : '0 4px 12px rgba(66,133,244,0.35)' }}>
                      <Send size={15} />
                      {emailSending ? 'Sending to Gmail...' : 'Send to Gmail Inbox'}
                    </button>
                  </div>
                  <div style={{ marginTop: '12px', padding: '10px 12px', backgroundColor: '#F8FAFC', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                    <p style={{ fontSize: '11px', color: '#94a3b8', margin: 0, lineHeight: '1.5' }}>
                      📌 After sending, Gmail Sent folder will open automatically. Email is saved to Email Center with status Sent.
                    </p>
                  </div>
                </div>
              )}

              {/* CALL MODAL */}
              {modalState.type === 'callModal' && modalState.data && (
                <div className={styles.modalFormBody}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 16px', backgroundColor: '#F8FAFC', borderRadius: '12px', marginBottom: '16px', border: '1px solid #e2e8f0' }}>
                    <div style={{ width: '46px', height: '46px', borderRadius: '50%', background: 'linear-gradient(135deg, #2563EB, #8B5CF6)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', fontWeight: 800, flexShrink: 0 }}>
                      {modalState.data?.customerName?.split(' ').map(n => n[0]).join('') || 'U'}
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, color: '#0f172a', fontSize: '15px' }}>{modalState.data?.customerName}</div>
                      <div style={{ fontSize: '13px', color: '#2563EB', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <Phone size={12} /> {modalState.data?.phone}
                      </div>
                      <div style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>{modalState.data?.project}</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 14px', backgroundColor: '#EFF6FF', border: '1px solid #BFDBFE', borderRadius: '8px', marginBottom: '16px' }}>
                    <PhoneCall size={15} style={{ color: '#2563EB', flexShrink: 0 }} />
                    <span style={{ fontSize: '12px', color: '#1D4ED8', fontWeight: 600 }}>
                      Choose call result. This will be saved to the <strong>Calls tab</strong> automatically.
                    </span>
                  </div>
                  <div className={styles.mInputGroup}>
                    <label>Call Duration (minutes) — optional</label>
                    <input type="number" min="0" max="999" value={callLogForm.duration} onChange={e => setCallLogForm(prev => ({ ...prev, duration: e.target.value }))} placeholder="e.g. 5" />
                  </div>
                  <div className={styles.mInputGroup}>
                    <label>Call Notes — optional</label>
                    <textarea rows="3" value={callLogForm.notes} onChange={e => setCallLogForm(prev => ({ ...prev, notes: e.target.value }))} placeholder="e.g. Discussed plot pricing and site visit schedule..."></textarea>
                  </div>
                  <div style={{ display: 'flex', gap: '8px', marginBottom: '8px', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '12px', color: '#64748b' }}>Will be saved as:</span>
                    <span style={{ backgroundColor: '#ECFDF5', color: '#10B981', padding: '2px 8px', borderRadius: '12px', fontSize: '11px', fontWeight: 600 }}>✅ Answered</span>
                    <span style={{ color: '#94a3b8', fontSize: '12px' }}>or</span>
                    <span style={{ backgroundColor: '#FEF2F2', color: '#EF4444', padding: '2px 8px', borderRadius: '12px', fontSize: '11px', fontWeight: 600 }}>❌ Missed</span>
                    <span style={{ color: '#94a3b8', fontSize: '12px' }}>or</span>
                    <span style={{ backgroundColor: '#FFF7ED', color: '#F59E0B', padding: '2px 8px', borderRadius: '12px', fontSize: '11px', fontWeight: 600 }}>⏳ Pending</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '4px' }}>
                    <button type="button" onClick={handleCallAnswered} disabled={callLogSaving} style={{ padding: '13px 20px', borderRadius: '10px', border: 'none', background: callLogSaving ? '#94a3b8' : 'linear-gradient(135deg, #10B981, #059669)', color: '#fff', fontSize: '14px', fontWeight: 700, cursor: callLogSaving ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', boxShadow: callLogSaving ? 'none' : '0 4px 14px rgba(16, 185, 129, 0.3)', transition: 'all 0.2s ease' }}>
                      <Phone size={16} />
                      {callLogSaving ? 'Saving...' : '✅ Call Answered — Dial & Log as Completed'}
                    </button>
                    <button type="button" onClick={handleCallPending} disabled={callLogSaving} style={{ padding: '13px 20px', borderRadius: '10px', border: 'none', background: callLogSaving ? '#94a3b8' : 'linear-gradient(135deg, #2563EB, #1D4ED8)', color: '#fff', fontSize: '14px', fontWeight: 700, cursor: callLogSaving ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', boxShadow: callLogSaving ? 'none' : '0 4px 14px rgba(37, 99, 235, 0.3)', transition: 'all 0.2s ease' }}>
                      <PhoneCall size={16} />
                      {callLogSaving ? 'Saving...' : '⏳ Just Dial — Log as Pending'}
                    </button>
                    <button type="button" onClick={handleCallMissed} disabled={callLogSaving} style={{ padding: '13px 20px', borderRadius: '10px', border: '1.5px solid #FCA5A5', background: '#FEF2F2', color: '#EF4444', fontSize: '14px', fontWeight: 700, cursor: callLogSaving ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', transition: 'all 0.2s ease', opacity: callLogSaving ? 0.6 : 1 }}>
                      <X size={16} />
                      {callLogSaving ? 'Saving...' : '❌ Call Missed — Log Without Dialing'}
                    </button>
                  </div>
                  <div style={{ marginTop: '12px', padding: '10px 12px', backgroundColor: '#F8FAFC', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                    <p style={{ fontSize: '11px', color: '#94a3b8', margin: 0, lineHeight: '1.6' }}>
                      📌 All call results are saved to the <strong>Calls tab</strong> with timestamp, duration and notes.
                    </p>
                  </div>
                </div>
              )}

              {/* New Lead Modal */}
              {modalState.type === 'newLead' && (
                <form onSubmit={handleNewLeadSubmit} className={styles.modalFormBody}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', padding: '10px 14px', backgroundColor: '#EFF6FF', border: '1px solid #BFDBFE', borderRadius: '8px' }}>
                    <UserPlus size={16} style={{ color: '#2563EB', flexShrink: 0 }} />
                    <span style={{ fontSize: '12px', color: '#1D4ED8', fontWeight: 600 }}>Fill in the details below. Lead will be saved to the database and displayed instantly.</span>
                  </div>
                  <div className={styles.mInputGroup}>
                    <label>Lead Title</label>
                    <input type="text" value={newLeadForm.title} onChange={e => setNewLeadForm(prev => ({ ...prev, title: e.target.value }))} placeholder="e.g. Interested in 200 SqYd Plot" />
                  </div>
                  <div className={styles.mInputGroup}>
                    <label>Customer Name <span style={{ color: '#EF4444' }}>*</span></label>
                    <input type="text" value={newLeadForm.customer_name} onChange={e => setNewLeadForm(prev => ({ ...prev, customer_name: e.target.value }))} placeholder="Enter full name" required />
                  </div>
                  <div className={styles.mInputGroup}>
                    <label>Phone Number</label>
                    <input type="text" value={newLeadForm.phone} onChange={e => setNewLeadForm(prev => ({ ...prev, phone: e.target.value }))} placeholder="+91-9876543210" />
                  </div>
                  <div className={styles.mInputGroup}>
                    <label>Email Address</label>
                    <input type="email" value={newLeadForm.email} onChange={e => setNewLeadForm(prev => ({ ...prev, email: e.target.value }))} placeholder="customer@email.com" />
                  </div>
                  <div className={styles.mInputGroup}>
                    <label>Project Interest</label>
                    <input type="text" value={newLeadForm.project} onChange={e => setNewLeadForm(prev => ({ ...prev, project: e.target.value }))} placeholder="e.g. Green Valley Phase II" />
                  </div>
                  <div className={styles.mInputGroup}>
                    <label>Lead Source</label>
                    <select value={newLeadForm.source} onChange={e => setNewLeadForm(prev => ({ ...prev, source: e.target.value }))} style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1.5px solid #e2e8f0', fontSize: '14px', color: '#0f172a', backgroundColor: '#fff', outline: 'none' }}>
                      <option value="">Select Source</option>
                      <option value="Website">Website</option>
                      <option value="Referral">Referral</option>
                      <option value="Facebook Ads">Facebook Ads</option>
                      <option value="Google Ads">Google Ads</option>
                      <option value="Walk-in">Walk-in</option>
                      <option value="Phone Inquiry">Phone Inquiry</option>
                      <option value="Instagram">Instagram</option>
                      <option value="JustDial">JustDial</option>
                      <option value="99acres">99acres</option>
                      <option value="MagicBricks">MagicBricks</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div className={styles.mInputGroup}>
                    <label>Budget Range</label>
                    <input type="text" value={newLeadForm.budget} onChange={e => setNewLeadForm(prev => ({ ...prev, budget: e.target.value }))} placeholder="e.g. ₹ 45-50 Lakhs" />
                  </div>
                  <div className={styles.mInputGroup}>
                    <label>Assigned To</label>
                    <input type="text" value={newLeadForm.assigned_to} onChange={e => setNewLeadForm(prev => ({ ...prev, assigned_to: e.target.value }))} placeholder="e.g. Rahul Sharma" />
                  </div>
                  <div className={styles.mInputGroup}>
                    <label>Lead Status</label>
                    <select value={newLeadForm.status} onChange={e => setNewLeadForm(prev => ({ ...prev, status: e.target.value }))} style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1.5px solid #e2e8f0', fontSize: '14px', color: '#0f172a', backgroundColor: '#fff', outline: 'none' }}>
                      <option value="new">New Lead</option>
                      <option value="contacted">Contacted</option>
                      <option value="interested">Interested</option>
                      <option value="not_interested">Not Interested</option>
                      <option value="converted">Converted</option>
                    </select>
                  </div>
                  <div className={styles.mInputGroup}>
                    <label>Follow-up Date</label>
                    <input type="date" value={newLeadForm.follow_up_date} onChange={e => setNewLeadForm(prev => ({ ...prev, follow_up_date: e.target.value }))} />
                  </div>
                  <div className={styles.mInputGroup}>
                    <label>Notes / Remarks</label>
                    <textarea rows="3" value={newLeadForm.notes} onChange={e => setNewLeadForm(prev => ({ ...prev, notes: e.target.value }))} placeholder="Any additional notes about this lead..."></textarea>
                  </div>
                  <button type="submit" disabled={newLeadSubmitting} className={styles.btnModalSubmitConvert} style={{ opacity: newLeadSubmitting ? 0.7 : 1, cursor: newLeadSubmitting ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                    <UserPlus size={16} />
                    {newLeadSubmitting ? 'Saving to Database...' : 'Save Lead to Database'}
                  </button>
                </form>
              )}

              {/* New Contact Modal */}
              {modalState.type === 'newContact' && (
                <form onSubmit={handleNewContactSubmit} className={styles.modalFormBody}>
                  <div className={styles.mInputGroup}>
                    <label>Full Name <span style={{ color: '#EF4444' }}>*</span></label>
                    <input type="text" value={newContactForm.full_name} onChange={e => setNewContactForm(p => ({ ...p, full_name: e.target.value }))} placeholder="Enter full name" required />
                  </div>
                  <div className={styles.mInputGroup}>
                    <label>Phone Number <span style={{ color: '#EF4444' }}>*</span></label>
                    <input type="text" value={newContactForm.phone} onChange={e => setNewContactForm(p => ({ ...p, phone: e.target.value }))} placeholder="+91..." required />
                  </div>
                  <div className={styles.mInputGroup}>
                    <label>Email Address</label>
                    <input type="email" value={newContactForm.email} onChange={e => setNewContactForm(p => ({ ...p, email: e.target.value }))} placeholder="email@example.com" />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                    <div className={styles.mInputGroup}>
                      <label>Company</label>
                      <input type="text" value={newContactForm.company} onChange={e => setNewContactForm(p => ({ ...p, company: e.target.value }))} />
                    </div>
                    <div className={styles.mInputGroup}>
                      <label>Designation</label>
                      <input type="text" value={newContactForm.designation} onChange={e => setNewContactForm(p => ({ ...p, designation: e.target.value }))} />
                    </div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                    <div className={styles.mInputGroup}>
                      <label>City</label>
                      <input type="text" value={newContactForm.city} onChange={e => setNewContactForm(p => ({ ...p, city: e.target.value }))} />
                    </div>
                    <div className={styles.mInputGroup}>
                      <label>State</label>
                      <input type="text" value={newContactForm.state} onChange={e => setNewContactForm(p => ({ ...p, state: e.target.value }))} />
                    </div>
                  </div>
                  <div className={styles.mInputGroup}>
                    <label>Status</label>
                    <select value={newContactForm.status} onChange={e => setNewContactForm(p => ({ ...p, status: e.target.value }))} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1.5px solid #e2e8f0' }}>
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                  <button type="submit" disabled={contactSubmitting} className={styles.btnModalSubmitConvert} style={{ marginTop: '10px' }}>
                    {contactSubmitting ? 'Saving...' : 'Save Contact'}
                  </button>
                </form>
              )}

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}