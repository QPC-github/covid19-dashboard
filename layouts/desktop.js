import React, {useState, useContext} from 'react'

import {AppContext} from '../pages'

import DateNav from '../components/date-nav'
import Scrollable from '../components/scrollable'
import ReactMapGL from '../components/react-map-gl'
import Statistics from '../components/statistics'
import Informations from '../components/informations'

import theme from '../styles/theme'
import colors from '../styles/colors'
import LayoutSelector from '../components/layout-selector'

import Drom from '../components/react-map-gl/drom'
import MapSelector from '../components/map-selector'

const DesktopPage = () => {
  const {selectedLocation, selectedMapIdx, setSelectedMapIdx} = useContext(AppContext)
  const LAYOUTS = {
    'Vue d’ensemble': () => (
      <>
        <div className='menu'>
          <Scrollable>
            <>
              <Statistics />
              <Informations />
            </>
          </Scrollable>
        </div>

        <div className='map'>
          <div className='metropole'>
            <div className='map-selector'>
              <MapSelector mapIdx={selectedMapIdx} selectMap={setSelectedMapIdx} />
            </div>
            <ReactMapGL code={selectedLocation || 'FR'} />
          </div>
          <div className='drom-container'>
            <Drom />
          </div>
        </div>

        <style jsx>{`
        .menu {
          z-index: 1;
          display: flex;
          flex-direction: column;
          max-width: ${theme.menuWidth};
          box-shadow: 0 1px 4px ${colors.lightGrey};
        }

        .map {
          display: flex;
          flex: 1;
          flex-direction: column;
          height: 100%;
        }

        .metropole {
          flex: 1;
        }

        .drom-container {
          display: flex;
          padding: 0.5em;
          height: 25%;
        }

        .map-selector {
          z-index: 1;
          position: absolute;
          background-color: #000000aa;
          color: #fff;
          border-radius: 4px;
          margin: 0.5em;
        }

        @media (max-width: 1000px) {
          .drom-container {
            height: 40%;
          }
        }

        @media (max-width: 800px) {
          .drom-container {
            height: 50%;
          }
        }
    `}</style>
      </>
    ),
    'Suivi des hospitalisations': () => (
      <h1>Suivi des hospitalisations</h1>
    ),
    'Suivi des tests': () => (
      <h1>
        Suivi des tests
      </h1>
    )
  }

  const [selectedLayout, setSelectedLayout] = useState(Object.keys(LAYOUTS)[0])

  return (
    <div className='desktop-container'>
      <div className='desktop-header'>
        <DateNav />
        <LayoutSelector
          selected={selectedLayout}
          layouts={Object.keys(LAYOUTS)}
          selectLayout={setSelectedLayout}
        />
      </div>

      <div className='desktop-content'>
        {LAYOUTS[selectedLayout]()}
      </div>

      <style jsx>{`
        .desktop-container {
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .desktop-header {
          z-index: 10;
          display: flex;
          flex-direction: column;
          box-shadow: 0 1px 4px ${colors.lightGrey};
        }
        .desktop-content {
          display: flex;
        }
    `}</style>
    </div>
  )
}

export default DesktopPage
