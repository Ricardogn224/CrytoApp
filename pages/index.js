
import Link from "next/link";
import Layout from "../components/Layout"
export default function Home({ data }) {
  console.log(data);
  return (
    <Layout page={"Crypto Whatch - Acceuil"} >
      <ul className="flex justiy-around py-18">
        {data.map((crypto, index) => (
          <li key={index} className="relative hover:shadow-md p-12 border border-blue-300 rounded-3xl bg-blue-100 md:m-auto flex-1 mx-5">
            <Link href={`/${crypto.name}?id=${crypto.id}`}>
              <a className="rounded-md">
                <div className="text-center">
                  <img src={crypto.logo_url} alt={crypto.name} className="mx-auto mb-6" width="50" height="10" />
                </div>
                <h2 className="text.2xl mb-6 uppercase tracking-wider">{crypto.name}</h2>
                <h3 className="font-bold text-2xl mb-4">{crypto.price} USD</h3>
                <p> 1 jour : <span className="font-bold">{parseFloat(crypto['1d'].price_change_pct * 100).toFixed(2) + "%"}</span>{crypto["1d"].price_change_pct < 0 ?
                  (<span className="text-red-500">&#x2798;</span>) :
                  (
                    <span className="text-green-500">
                      &#x279A;
                    </span>
                  )

                }</p>

                <p> 1 mois : <span className="font-bold">{parseFloat(crypto['30d'].price_change_pct * 100).toFixed(2) + "%"}</span>{crypto["1d"].price_change_pct < 0 ?
                  (<span className="text-red-500">&#x2798;</span>) :
                  (
                    <span className="text-green-500">
                      &#x279A;
                    </span>
                  )

                }</p>

                <p> 1 an : <span className="font-bold">{parseFloat(crypto['365d'].price_change_pct * 100).toFixed(2) + "%"}</span>{crypto["1d"].price_change_pct < 0 ?
                  (<span className="text-red-500">&#x2798;</span>) :
                  (
                    <span className="text-green-500">
                      &#x279A;
                    </span>
                  )

                }</p>
              </a>
            </Link>
          </li>

        ))}
      </ul>
    </Layout >
  )
}


export async function getStaticProps(context) {
  const res = await fetch(`https://api.nomics.com/v1/currencies/ticker?key=8c4bc6173bd3c7a3b5f11c4eaead6ab1f73e7633&ids=BTC,ETH,XRP&interval=1d,30d,365d`)
  const data = await res.json()

  if (!data) {
    return {
      notFound: true,
    }
  }

  return {
    props: { data }, // will be passed to the page component as props
  }
}