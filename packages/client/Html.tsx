export const Html = ({ children, styles }: any) => {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/png" href="/cheburashka.png" />
        <title>Cheburland</title>
        {/* We will inject extracted styles here */}
        {styles}
      </head>
      <body>
        <div id="root" dangerouslySetInnerHTML={{ __html: children }} />
        <script type="module" src="/src/main.tsx"></script>
      </body>
    </html>
  )
}
