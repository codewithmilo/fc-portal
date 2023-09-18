import { useState } from 'react'
import { slide as BurgerMenu } from 'react-burger-menu'

export enum Client {
  WARPCAST = 'warpcast',
  DISCOVE = 'discove',
  PHRASETOWN = 'phrasetown',
  JAM = 'jam',
}

export default function Menu({ signout }: { signout: () => void }) {
  const [clientOptionsOpen, setClientOptionsOpen] = useState(false)
  const [client, setClient] = useState<Client>(
    (localStorage.getItem('client') as Client) || Client.WARPCAST,
  )

  const saveClient = (selection: Client) => {
    console.log(selection)
    localStorage.setItem('client', selection)
    setClient(selection)
  }

  return (
    <BurgerMenu right disableAutoFocus width={200} styles={styles} itemListElement="div">
      <div onClick={() => setClientOptionsOpen(!clientOptionsOpen)}>Client</div>
      {clientOptionsOpen && (
        <div>
          <select
            style={{ padding: '5px' }}
            value={client}
            onChange={(e) => saveClient(e.target.value as Client)}
          >
            <option value={Client.WARPCAST}>Warpcast</option>
            <option value={Client.DISCOVE}>Discove</option>
            <option value={Client.PHRASETOWN}>Phrasetown</option>
            <option value={Client.JAM}>Jam</option>
          </select>
        </div>
      )}
      <div onClick={signout}>Sign out</div>
    </BurgerMenu>
  )
}

const styles = {
  bmBurgerButton: {
    position: 'fixed',
    width: '16px',
    height: '10px',
    right: '20px',
    top: '20px',
  },
  bmBurgerBars: {
    background: 'white',
  },
  bmBurgerBarsHover: {
    background: '#a90000',
  },
  bmCrossButton: {
    height: '24px',
    width: '24px',
    top: '12px',
    right: '15px',
  },
  bmCross: {
    background: '#bdc3c7',
  },
  bmMenuWrap: {
    position: 'fixed',
    height: '100%',
  },
  bmMenu: {
    background: '#373a47',
    padding: '2.5em 1.5em 0',
    fontSize: '1.15em',
  },
  bmMorphShape: {
    fill: '#373a47',
  },
  bmItemList: {
    color: 'white',
    padding: '0.8em',
  },
  bmItem: {
    display: 'flex',
    color: 'white',
    textDecoration: 'none',
    paddingBottom: '1em',
    cursor: 'pointer',
  },
  bmOverlay: {
    background: 'rgba(0, 0, 0, 0.3)',
  },
}
