import { Text, FlatList, ActivityIndicator } from 'react-native';
import React, { useEffect } from 'react';
import orders from '@/assets/data/orders';
import OrderListItem from '@components/OrderListItem';
import { Stack } from 'expo-router';
import { useAdminOrderList } from '@/src/api/orders';
import { supabase } from '@/src/lib/supabase';
import { useQueryClient } from '@tanstack/react-query';

export default function OrdersScreen() {
  const {
    data: orders,
    isLoading,
    error,
  } = useAdminOrderList({ archived: false });


  const queryClient = useQueryClient();

 useEffect(() => {
  
const channels = supabase.channel('custom-insert-channel')
.on(
  'postgres_changes',
  { event: 'INSERT', schema: 'public', table: 'orders' },
  (payload) => {
    console.log('Change received!', payload)
    queryClient.invalidateQueries(['orders'])
  }
)
.subscribe()
  }, []);

  if (isLoading) {
    return <ActivityIndicator />;
  }
  if (error) {
    return <Text>Failed to fetch</Text>;
  }

  return (
    <FlatList
      data={orders}
      renderItem={({ item }) => <OrderListItem order={item} />}
      contentContainerStyle={{ gap: 10, padding: 10 }}
    />
  );
}
