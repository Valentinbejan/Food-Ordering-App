import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import React, { useReducer, useState } from 'react';
import { Link, Stack, useLocalSearchParams, useRouter } from 'expo-router';
import products from '@/assets/data/products';
import { defaultPizzaImage } from '@components/ProductListItem';
import { PizzaSize } from '../../../types';
import Button from '@components/Button';
import { useCart } from '@/src/providers/CartProvider';
import { FontAwesome } from '@expo/vector-icons';
import Colors from '@/src/constants/Colors';
import { useProduct } from '@/src/api/products';


const sizes: PizzaSize[] = ['S', 'M', 'L', 'XL'];




const ProductDetailsScreen = () => {
  const { id: idString } = useLocalSearchParams();
const id = parseFloat(typeof idString === 'string' ? idString : idString[0]);
const { data: product, error, isLoading } = useProduct(id);


  const { addItem } = useCart();

  const router = useRouter();

  const [selectedSize, setSelectedSize] = useState<PizzaSize>('M');

  

  const addToCart = () => {
    if (!product) {
      return;
    }
    addItem(product, selectedSize);
    console.warn('Add to cart, size: ',selectedSize);
    router.push('/cart');
  };

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>Failed to fetch products</Text>;
  }


  // const addToCart = () => {
  //  console.warn('Add to cart, size: ',selectedSize);
  // };




  if (!product) return;
 <text>Product not found</text>


  return (
    <View style={styles.container}>

<Stack.Screen 
 options={{title: 'Menu', headerRight: () => (
            <Link href={`/(admin)/menu/create?id=${id}`} asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="pencil"
                    size={25}
                    color={Colors.light.tint}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),}} />


       <Stack.Screen options={{title: product?.name}} />
      <Image
        source={{ uri: product.image || defaultPizzaImage }}
        style={styles.image}
        resizeMode="contain"
      />



      <Text style={styles.price}>Name: {product.name}</Text>
      <Text style={styles.price}>Price: ${product.price.toFixed(2)}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 10,
    flex: 1,
  },
  image: {
    width: '100%',
    aspectRatio: 1,
    alignSelf: 'center',
  },
  subtitle: {
    marginVertical: 10,
    fontWeight: '600',
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
  },

});

export default ProductDetailsScreen;