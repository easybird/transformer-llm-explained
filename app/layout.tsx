import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Transformer Explainer',
  description: 'Learn about Transformers, self-attention, and how LLMs generate text',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="container mx-auto p-4">
          <h1 className="text-3xl font-bold text-center mb-6">Transformer Explainer</h1>
          <Tabs defaultValue="attention" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="attention" asChild>
                <Link href="/">Attention Visualization</Link>
              </TabsTrigger>
              <TabsTrigger value="text-generation" asChild>
                <Link href="/text-generation">How LLMs Generate Text</Link>
              </TabsTrigger>
            </TabsList>
            <TabsContent value="attention">{children}</TabsContent>
            <TabsContent value="text-generation">{children}</TabsContent>
          </Tabs>
        </div>
      </body>
    </html>
  )
}

