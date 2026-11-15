import Link from 'next/link'
import { siteOperator } from '@/lib/site-info'
import { englishMetadata } from '@/lib/page-metadata'
export const metadata = { ...englishMetadata('/en/contact', 'Contact JSTools — Questions and error reports', 'Contact the JSTools operator about tool errors, usage questions, suggestions or privacy requests. Learn which details help explain an issue.'), robots: { index: Boolean(siteOperator.email), follow: true } }
export default function Contact() {
  return <main className="info-page space-y-8"><header className="space-y-3"><Link href="/en">JSTools home</Link><h1 className="text-3xl font-bold">Contact and error reports</h1><p>Send questions about tools, suggestions for improvements or privacy inquiries.</p></header>
    <section className="space-y-3 rounded-xl border p-5"><h2 className="text-xl font-semibold">Operator contact</h2><p>Operator: JSTools operator</p>{siteOperator.email ? <p className="break-words">Email: <a href={`mailto:${siteOperator.email}`}>{siteOperator.email}</a></p> : <p>A public contact email is being prepared.</p>}</section>
    <section className="space-y-3"><h2 className="text-xl font-semibold">When reporting an issue</h2><ul className="list-disc pl-5 space-y-2"><li>The tool name or page URL</li><li>Your device, browser and the steps leading to the issue</li><li>The expected result and what the page actually showed, including the error message</li><li>For an image issue: format, pixel dimensions, approximate file size, selected settings and whether only some files failed</li></ul><p>Do not send government ID numbers, passwords, verification codes or original personal photos. Where possible, explain file issues using a sample without personal information.</p></section>
<p>Before attaching a screenshot, hide personal file names, addresses and account details. Reproducible details help us investigate; we do not guarantee a fix for every device or a response within a fixed time.</p>
    <section className="space-y-3"><h2 className="text-xl font-semibold">Privacy inquiries</h2><p>Only include a name or reply address as needed for your inquiry. Information received by email is used to review and respond to the inquiry. Requests about deletion or processing can be sent to the same address.</p><Link href="/en/privacy">Read the Privacy Policy</Link></section>
  </main>
}
