// a composable for mutation for authenticated user
export default function (query) {
  const { mutate, onDone, loading, onError } = useMutation(query, () => ({
    fetchPolicy: "network-only",
    // clientId: clientId,
    context: {
      headers: {
        "x-hasura-role": "admin",
        "x-hasura-admin-secret":
          "c1oEQfDhTMEvm3om5mGNmC9Qqg3YouSRaQN2z7a0SzFz4O9HUYxcL8NlgFLbcYHZ",
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
