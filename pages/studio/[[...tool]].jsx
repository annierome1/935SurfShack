import Head from 'next/head'
import dynamic from 'next/dynamic'
import config from '../../sanity/sanity.config'

const NextStudio = dynamic(
  () => import('next-sanity/studio').then((mod) => mod.NextStudio),
  { ssr: false, loading: () => <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading Studio…</div> }
)

export default function StudioPage() {
  return (
    <>
      <Head>
        <title>935 Surf Shack — Studio</title>
      </Head>
      <NextStudio config={config} />
    </>
  )
}
