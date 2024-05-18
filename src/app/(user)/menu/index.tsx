import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Image,FlatList, useAnimatedValue, ActivityIndicator } from 'react-native'; // Consolidated import

import products from '@/assets/data/products';
import ProductListItem from '@/src/components/ProductListItem';
import { supabase } from '@/src/lib/supabase';
import { useQuery } from  '@tanstack/react-query';
import { useProductList } from '@/src/api/products';


export default function MenuScreen() {

  const { data: products, error, isLoading } = useProductList();

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>Failed to fetch products</Text>;
  }
  

//   useEffect(() => { 
//     const fetchProducts = async () => {
//       const { data,error } = await supabase.from('products').select('*');
        
//         console.log(error);
//         console.log(data);

//     };
//     fetchProducts();
// }, []);
  
  
  
  
  return (
        <FlatList
          data={products}
          renderItem={({item}) => <ProductListItem product={item} />}
          numColumns={2}
          contentContainerStyle = {{gap: 10}}
          columnWrapperStyle = {{gap: 10}}     
        />


   
  );
}

