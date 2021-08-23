import Layout from "../components/Layout"

export default function Currency({ data }) {
    return (
        <Layout page={'Page ' + data.name}>
            <div className="relative hover: shadow md p-8 border border-blue-300 sm:rounded-3xl bg-blue-100 md:w-auto flex-1 mx-5">
                <div className="text-center">
                    <img
                        src={data.logo_url}
                        alt={data.name}
                        className="w-20 h-20 mx-auto mb-6"
                    />
                </div>
                <h2 className="text-2xl mb-6 uppercase tracking-wider">{data.name}</h2>
                <p>{data.description}</p>
                <p className="pt-5  text-blue-500">
                    <a href={data.reddit_url} target="_blank">
                        {data.reddit_url}
                    </a>
                </p>
            </div>

        </Layout>
    );
}

export async function getServerSideProps({ query }) {

    const res = await fetch(`https://api.nomics.com/v1/currencies?key=8c4bc6173bd3c7a3b5f11c4eaead6ab1f73e7633&ids=${query.id}&attributes=id,name,logo_url,description,reddit_url`)
    const data = await res.json()

    if (!data) {
        return {
            notFound: true,
        }
    }

    return {
        props: { data: data[0] }, // will be passed to the page component as props
    }
}