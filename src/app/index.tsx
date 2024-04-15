import { View, Text, ActivityIndicator } from 'react-native';
import React from 'react';
import { Link, Redirect } from 'expo-router';
import Button from '@/components/Button';
import { useAuth } from '@/providers/AuthProvider';
import { supabase } from '@/lib/supabase';

const index = () => {
  const {session, loading, isAdmin} = useAuth()

  if(loading) {
    return <ActivityIndicator />
  }

  if(!session) {
    return <Redirect href={"/(auth)/sign-in"} />
  }
  
  // console.log(session)

  if(!isAdmin) {
    return <Redirect href={"/(user)"} />
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 10 }}>
      <Link href={'/(user)'} asChild>
        <Button text="User" />
      </Link>
      <Link href={'/(admin)'} asChild>
        <Button text="Admin" />
      </Link>
      
      {/* <Link href={'/(auth)/sign-in'} asChild>
        <Button text="Sign in" />
      </Link> */}

      <Button text="Sign out" onPress={() => supabase.auth.signOut()} />
    </View>
  );
};

export default index;