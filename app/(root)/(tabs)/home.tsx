import { Link } from 'expo-router'
import { Text, View } from 'react-native'

export default function Page() {
  return (
    <View>
      {/* Display Sign In and Sign Up links when the user is not authenticated */}
      <Link href="/signIn">
        <Text>Sign In</Text>
      </Link>
      <Link href="/signUp">
        <Text>Sign Up</Text>
      </Link>
    </View>
  )
}
