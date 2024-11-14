
import { Stack } from 'expo-router';



const _layouts = () => {

  return (
  
      <Stack>
        <Stack.Screen name="welcomme" options={{ headerShown: false }} />
        <Stack.Screen name="signIn" options={{ headerShown: false }} />
        <Stack.Screen name="signUp" options={{ headerShown: false }} />
        
      </Stack>
    
  );
}

export default _layouts;





