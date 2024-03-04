import { ref } from "vue";

export default function (query, { clientId = "default", role }) {
  const { mutate, onDone, loading, onError } = useMutation(query, () => ({
    fetchPolicy: "network-only",
    clientId: clientId,
    //     context: {
    //       headers: {
    //         "x-hasura-role": role || "org-member",
    //       },
    //     },
  }));
  return {
    mutate,
    loading,
    onDone,
    onError,
  };
}
