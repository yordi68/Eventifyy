import { ref } from "vue";

const enable = ref(true);
const client_ = ref("default");

export default function (
  query,
  { id, enabled = enable, clientId = client_.value, role, include = false }
) {
  const { onResult, onError, loading, refetch } = useQuery(
    query,
    () => ({
      id,
      include,
    }),
    () => ({
      fetchPolicy: "no-cache",
      clientId: clientId,
      context: {
        headers: {},
      },
      enabled: enabled.value,
    })
  );
  return {
    onResult,
    loading,
    refetch,
    onError,
  };
}
