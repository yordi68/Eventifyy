const client_ = ref("default");
const isAuthenticated_ = ref(false);
export default function (
  query,
  { clientId = client_.value, isAuthenticated = isAuthenticated_.value }
) {
  const { mutate, onDone, loading, onError } = useMutation(query, () => ({
    fetchPolicy: "network-only",
    clientId: clientId,
    include: isAuthenticated,
    context: {
      headers: {
        // "x-hasura-role": "admin",
        // "x-hasura-admin-secret":
        //   "c1oEQfDhTMEvm3om5mGNmC9Qqg3YouSRaQN2z7a0SzFz4O9HUYxcL8NlgFLbcYHZ",
        // Authorization: `Bearer ${token} `,
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
