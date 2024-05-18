import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import React, { useReducer, useState } from 'react';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import products from '@/assets/data/products';
import { defaultPizzaImage } from '@components/ProductListItem';
import { PizzaSize } from '../../../types';
import Button from '@components/Button';
import { useCart } from '@/src/providers/CartProvider';
import { useProduct } from '@/src/api/products';


const sizes: PizzaSize[] = ['S', 'M', 'L', 'XL'];


const product = products[0];

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
    <View>
       <Stack.Screen options={{title: product?.name}} />
      <Image
        source={{ uri: product.image || defaultPizzaImage }}
        style={styles.image}
        resizeMode="contain"
      />

<Text style={styles.subtitle}>Select size</Text>
<View style={styles.sizes}>
        {sizes.map((size) => (
          <Pressable
            onPress={() => setSelectedSize(size)}
            key={size}
            style={[
              styles.size,
              {
                backgroundColor: size === selectedSize ? 'gainsboro' : 'white',
              },
            ]}
          >
            <Text
              style={[
                styles.sizeText,
                { color: size === selectedSize ? 'black' : 'gray' },
              ]}
            >
              {size}
            </Text>
          </Pressable>
        ))}
      </View>
      <Text style={styles.price}>Price: ${product.price.toFixed(2)}</Text>
      <Button onPress={addToCart} text="Add to cart" />
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
    marginTop: 'auto',
  },

  sizes: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  size: {
    width: 50,
    aspectRatio: 1,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sizeText: {
    fontSize: 20,
    fontWeight: '500',
    color: 'black',
  },
});

export default ProductDetailsScreen;