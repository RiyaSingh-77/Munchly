import React from 'react'
import '../styles/business-profile.css'

const BusinessProfile = ({
  name = 'Business name',
  address = 'Address',
  totalMeals = 43,
  customerServe = '15K',
  tiles = 12
}) => {
  return (
    <div className="bp-wrapper">
      <div className="bp-card">
        <div className="bp-header">
          <div className="bp-avatar" aria-hidden />
          <div className="bp-header-right">
            <div className="bp-name">{name}</div>
            <div className="bp-pill">{address}</div>
          </div>
        </div>

        <div className="bp-stats">
          <div className="bp-stat">
            <div className="bp-stat-label">total meals</div>
            <div className="bp-stat-value">{totalMeals}</div>
          </div>
          <div className="bp-stat bp-stat-right">
            <div className="bp-stat-label">customer serve</div>
            <div className="bp-stat-value">{customerServe}</div>
          </div>
        </div>

        <div className="bp-grid" role="list">
          {Array.from({ length: tiles }).map((_, i) => (
            <div className="bp-tile" role="listitem" key={i}>
              <span className="bp-tile-label">video</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default BusinessProfile
