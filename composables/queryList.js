import { ref } from "vue";

const enable = ref(true);
const offset_ = ref(0);
const limit_ = ref(100);
const filter_ = ref({});
const client_ = ref("default");
const isAuthenticated_ = ref(false);

export default function (
  query,
  {
    filter = filter_,
    order,
    limit = limit_,
    offset = offset_,
    enabled = enable,
    clientId = client_.value,
    isAuthenticated = isAuthenticated_.value,
    role,
  }
) {
  const { onResult, onError, loading, refetch } = useQuery(
    query,
    () => ({
      limit: limit && limit?.value ? limit.value : undefined,
      filter: filter && filter.value ? filter.value : {},
      order: order && order?.value ? order.value : undefined,
      offset: offset && offset?.value ? offset.value : undefined,
    }),
    () => ({
      fetchPolicy: "no-cache",
      clientId: clientId,
      include: isAuthenticated,
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
