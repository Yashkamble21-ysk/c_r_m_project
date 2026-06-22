import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { 
  MapPin, Maximize2, Compass, IndianRupee, Sparkles, 
  CheckCircle2, Lock, Send, Layers, ShieldAlert
} from 'lucide-react'
import styles from './PlotMasterplanMatrix.module.css'

// Interactive physical plot inventory simulating a high-end gated community masterplan
const plotParcels = [
  { id: 'A-01', status: 'sold', size: '250 sq. yds', facing: 'East', basePrice: 4500000, plc: 'None', buyer: 'Sold to NRI (Dubai)', aiNote: 'Transaction closed in 4 days via automated WhatsApp payment link.' },
  { id: 'A-02', status: 'available', size: '300 sq. yds', facing: 'North-East', basePrice: 5400000, plc: '₹3,00,000 (Park Facing)', buyer: 'Available for Instant Booking', aiNote: 'High intent: 14 clients viewed this virtual tour today. AI suggests 5% token discount.' },
  { id: 'A-03', status: 'hold', size: '400 sq. yds', facing: 'North', basePrice: 7200000, plc: '₹5,00,000 (Corner Plot)', buyer: 'Reserved by Dr. Sharma', aiNote: 'Token advance ₹5,00,000 locked. Escrow agreement dispatched via DocuSign.' },
  { id: 'A-04', status: 'available', size: '250 sq. yds', facing: 'West', basePrice: 4500000, plc: 'None', buyer: 'Available for Instant Booking', aiNote: 'Prime entry-level parcel. Perfect for standard villa construction workflows.' },
  { id: 'B-01', status: 'available', size: '500 sq. yds', facing: 'East', basePrice: 9000000, plc: '₹7,50000 (Clubhouse Adjacent)', buyer: 'Available for Instant Booking', aiNote: 'Premium estate parcel. AI agent currently nurturing 3 ultra-HNI leads.' },
  { id: 'B-02', status: 'sold', size: '350 sq. yds', facing: 'South-East', basePrice: 6300000, plc: 'None', buyer: 'Sold to Mr. Gupta', basePriceFormatted: '₹63 Lacs', aiNote: 'Full payment received upfront. RERA registration deed auto-filed.' },
  { id: 'B-03', status: 'hold', size: '300 sq. yds', facing: 'North', basePrice: 5400000, plc: '₹2,50,000 (Wide Road)', buyer: 'Reserved (48hr Window)', aiNote: 'Automated follow-up sequence running. Client site-visit scheduled for tomorrow 11 AM.' },
  { id: 'B-04', status: 'available', size: '450 sq. yds', facing: 'West', basePrice: 8100000, plc: '₹4,00,000 (Corner Glow)', buyer: 'Available for Instant Booking', aiNote: 'Rare dual-access corner geometry. Highest projected capital appreciation tier.' },
]

export default function PlotMasterplanMatrix() {
  const [selectedPlot, setSelectedPlot] = useState(plotParcels[1]) // Default to A-02 Available
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 })

  return (
    <section id="masterplan" className={styles.section} ref={ref}>
      {/* Upgraded to container-fluid for edge-to-edge widescreen desktop span */}
      <div className={`container-fluid ${styles.containerInner}`}>
        
        {/* Widescreen Section Header */}
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className={styles.tag}>Live Inventory Visualization</span>
          <h2 className={styles.title}>Interactive Digital <span className={styles.highlight}>Masterplan Matrix</span></h2>
          <p className={styles.desc}>
            Say goodbye to static, outdated PDF paper layouts. PlotCRM AI renders physical land masterplans in real-time. Field executives and buyers can inspect live layout availability, instantly calculate Preferential Location Charges (PLC), and dispatch secure token advances directly from the interactive grid.
          </p>
        </motion.div>

        {/* Immersive Widescreen Control Room Grid */}
        <div className="row g-5 align-items-center">
          
          {/* Left Column: Interactive Physical Street Grid */}
          <div className="col-lg-7">
            <motion.div
              className={styles.masterplanStage}
              initial={{ opacity: 0, x: -40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, ease: 'easeOut' }}
            >
              <div className={styles.stageHeader}>
                <div className={styles.projectInfo}>
                  <Layers size={20} className={styles.projectIcon} />
                  <div>
                    <h4 className={styles.projectName}>Sector-7 Project Masterplan</h4>
                    <span className={styles.projectSub}>Phase II Gated Villa Development &bull; Live RERA Sync</span>
                  </div>
                </div>

                {/* Color Legend */}
                <div className={styles.legend}>
                  <span className={styles.legendItem}>
                    <span className={styles.dotAvailable} /> Available
                  </span>
                  <span className={styles.legendItem}>
                    <span className={styles.dotHold} /> Reserved
                  </span>
                  <span className={styles.legendItem}>
                    <span className={styles.dotSold} /> Sold Out
                  </span>
                </div>
              </div>

              {/* Physical Street Layout Simulation */}
              <div className={styles.streetGrid}>
                <div className={styles.roadLine}>
                  <span>CENTRAL BOULEVARD (60 FT WIDE ACCESS ROAD)</span>
                </div>

                <div className={styles.parcelsWrapper}>
                  {plotParcels.map((p) => {
                    const isSelected = selectedPlot.id === p.id
                    return (
                      <motion.div
                        key={p.id}
                        onClick={() => setSelectedPlot(p)}
                        className={`
                          ${styles.parcelBox} 
                          ${p.status === 'available' ? styles.statusAvailable : ''}
                          ${p.status === 'hold' ? styles.statusHold : ''}
                          ${p.status === 'sold' ? styles.statusSold : ''}
                          ${isSelected ? styles.parcelSelected : ''}
                        `}
                        whileHover={{ scale: 1.04, y: -4 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className={styles.parcelHeader}>
                          <span className={styles.plotId}>#{p.id}</span>
                          {p.plc !== 'None' && <Sparkles size={14} className={styles.cornerStar} />}
                        </div>
                        <span className={styles.parcelSize}>{p.size}</span>
                        <span className={styles.parcelFacing}>{p.facing}</span>
                      </motion.div>
                    )
                  })}
                </div>

                <div className={styles.roadLine}>
                  <span>ESTATE AVENUE (40 FT INNER CLUBHOUSE ROAD)</span>
                </div>
              </div>

            </motion.div>
          </div>

          {/* Right Column: Live Plot RERA Inspector & Deal Calculator */}
          <div className="col-lg-5">
            <motion.div
              className={styles.inspectorCard}
              initial={{ opacity: 0, x: 40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
            >
              <div className={styles.inspectorTop}>
                <div>
                  <span className={styles.inspectorLabel}>LIVE PLOT INSPECTOR</span>
                  <h3 className={styles.selectedTitle}>Parcel #{selectedPlot.id}</h3>
                </div>
                <span className={`
                  ${styles.statusBadge}
                  ${selectedPlot.status === 'available' ? styles.badgeGreen : ''}
                  ${selectedPlot.status === 'hold' ? styles.badgeOrange : ''}
                  ${selectedPlot.status === 'sold' ? styles.badgeRed : ''}
                `}>
                  {selectedPlot.status.toUpperCase()}
                </span>
              </div>

              {/* Dynamic Specs Matrix */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedPlot.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className={styles.specsMatrix}
                >
                  <div className={styles.specItem}>
                    <Maximize2 size={18} className={styles.specIcon} />
                    <div>
                      <span className={styles.specSub}>Super Area</span>
                      <span className={styles.specVal}>{selectedPlot.size}</span>
                    </div>
                  </div>

                  <div className={styles.specItem}>
                    <Compass size={18} className={styles.specIcon} />
                    <div>
                      <span className={styles.specSub}>Vaastu Orientation</span>
                      <span className={styles.specVal}>{selectedPlot.facing} Facing</span>
                    </div>
                  </div>

                  <div className={styles.specItem}>
                    <IndianRupee size={18} className={styles.specIcon} />
                    <div>
                      <span className={styles.specSub}>Base Land Value</span>
                      <span className={styles.specVal}>₹{(selectedPlot.basePrice / 100000).toFixed(2)} Lacs</span>
                    </div>
                  </div>

                  <div className={styles.specItem}>
                    <Sparkles size={18} className={styles.specIcon} />
                    <div>
                      <span className={styles.specSub}>PLC Premium</span>
                      <span className={styles.specVal}>{selectedPlot.plc}</span>
                    </div>
                  </div>

                  {/* AI Intelligence Box */}
                  <div className={styles.aiIntelligence}>
                    <div className={styles.aiHeader}>
                      <Sparkles size={16} className={styles.aiGlowIcon} />
                      <span>Autonomous AI Deal Recommendation</span>
                    </div>
                    <p className={styles.aiText}>{selectedPlot.aiNote}</p>
                  </div>

                  {/* Dynamic Interactive CTA */}
                  <div className={styles.actionWrap}>
                    {selectedPlot.status === 'available' && (
                      <button className={styles.btnLock}>
                        <Lock size={18} /> Dispatch WhatsApp Escrow Link <Send size={16} />
                      </button>
                    )}

                    {selectedPlot.status === 'hold' && (
                      <div className={styles.noticeHold}>
                        <CheckCircle2 size={18} /> Escrow tracking active. Reserved for 48 hours.
                      </div>
                    )}

                    {selectedPlot.status === 'sold' && (
                      <div className={styles.noticeSold}>
                        <ShieldAlert size={18} /> Title deed transferred. Registration ID locked.
                      </div>
                    )}
                  </div>

                </motion.div>
              </AnimatePresence>

            </motion.div>
          </div>

        </div>

      </div>
    </section>
  )
}