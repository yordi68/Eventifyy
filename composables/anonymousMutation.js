// a composable for mutation for authenticated user
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MTEzODc2OTYsImh0dHBzOi8vaGFzdXJhLmlvL2p3dC9jbGFpbXMiOnsieC1oYXN1cmEtYWxsb3dlZC1yb2xlcyI6WyJ1c2VyIl0sIngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6InVzZXIiLCJ4LWhhc3VyYS11c2VyLWlkIjoiNDRiZDg0OTUtNzgzNC00YWM1LWFlZjItNjlkNmRlOGUxMDQ2In0sImlhdCI6MTcwOTU4NzY5Niwic3ViIjoiMTIzNDUifQ.uBVnqq6kVlBi3pwOUHA9PhGnl0kb2Vujs5X25_O4ejo";

export default function (query) {
  const { mutate, onDone, loading, onError } = useMutation(query, () => ({
    fetchPolicy: "network-only",
    // clientId: clientId,
    context: {
      headers: {
        // "x-hasura-role": "admin",
        // "x-hasura-admin-secret":
        //   "c1oEQfDhTMEvm3om5mGNmC9Qqg3YouSRaQN2z7a0SzFz4O9HUYxcL8NlgFLbcYHZ",

        Authorization: `Bearer ${token} `,
      },
    },
  }));
  return {
    mutate,
    loading,
    onDone,
    onError,
  };
}

// { clientId = "default", role }
