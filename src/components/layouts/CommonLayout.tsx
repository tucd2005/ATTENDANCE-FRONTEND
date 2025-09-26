import HeaderPage from '../common/HeaderPage'
import { Outlet } from 'react-router-dom'
import FooterPage from '../common/FooterPage'

const CommonLayout = () => {
  return (
    <div className="max-w-7xl mx-auto ">
    <HeaderPage />
        <main className="py-6">
            <Outlet />
        </main>
    <FooterPage />
</div>
  )
}

export default CommonLayout
