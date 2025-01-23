
import dynamic from 'next/dynamic';
const TopNav = dynamic(() => import('./TopNav'))
const Footer = dynamic(() => import('./Footer'))
interface Props {
    children: React.ReactNode;
}
export default function Layout({ children }: Props) {
  return <>
		<TopNav />
		{children}
		<Footer />
  </>
}