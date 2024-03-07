import { ref } from "vue";

const enable = ref(true);
const offset_ = ref(0);
const limit_ = ref(100);
const filter_ = ref({});
const client_ = ref("default");

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MTEzODc2OTYsImh0dHBzOi8vaGFzdXJhLmlvL2p3dC9jbGFpbXMiOnsieC1oYXN1cmEtYWxsb3dlZC1yb2xlcyI6WyJ1c2VyIl0sIngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6InVzZXIiLCJ4LWhhc3VyYS11c2VyLWlkIjoiNDRiZDg0OTUtNzgzNC00YWM1LWFlZjItNjlkNmRlOGUxMDQ2In0sImlhdCI6MTcwOTU4NzY5Niwic3ViIjoiMTIzNDUifQ.uBVnqq6kVlBi3pwOUHA9PhGnl0kb2Vujs5X25_O4ejo";
export default function (
  query,
  {
    filter = filter_,
    order,
    limit = limit_,
    offset = offset_,
    enabled = enable,
    clientId = client_.value,
    role,
  }
) {
  const { onResult, onError, loading, refetch } = useQuery(
    query,
    () => ({
      limit: limit && limit?.value ? limit.value : undefined,
      filter: filter && filter.value ? filter.value : {},
      order: order && order?.value.length ? order.value : undefined,
      offset: offset && offset?.value ? offset.value : undefined,
    }),
    () => ({
      fetchPolicy: "no-cache",
      clientId: clientId,
      context: {
        headers: {
          Authorization: `Bearer ${token} `,
        },
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
