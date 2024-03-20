export const fetchData = async () => {
    const respose = await fetch(
        "https://fakerapi.it/api/v1/users"
    )

    const results = await respose.json()
    // console.log(results?.data,  "data!!")

    return results?.data
}