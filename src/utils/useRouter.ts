import {
  useParams,
  useLocation,
  useNavigate
} from 'react-router-dom'
import { useMemo } from 'react'
import { parseParams } from './querystring'

export default function useRouter () {
  const params = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  // Return our custom router object
  // Memoize so that a new object is only returned if something changes
  return useMemo(() => {
    return {
      // For convenience add push(), replace(), pathname at top level
      push: navigate,
      replace: (to: string) => navigate(to, { replace: true }),
      pathname: location.pathname,
      goBack: () => navigate(-1),
      // Merge params and parsed query string into single "query" object
      // so that they can be used interchangeably.
      // Example: /:topic?sort=popular -> { topic: "react", sort: "popular" }
      query: {
        ...parseParams(location.search) // Convert string to object
      },
      params,
      // Include match, location, history objects so we have
      // access to extra React Router functionality if needed.
      location,
      history
    }
  }, [params, location, history])
}
