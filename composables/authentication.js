// a composable for mutation for authenticated user

export default function (query) {
  const { mutate, onDone, loading, onError } = useMutation(query, () => ({
    fetchPolicy: "network-only",
    clientId: "default",
  }));
  return {
    mutate,
    loading,
    onDone,
    onError,
  };
}

// { clientId = "default", role }
