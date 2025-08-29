import { fetchEpisodes } from '@/api/fetchEpisodes';
import { ThemedText } from '@/components/ThemedText';
import { Image } from 'expo-image';
import { Stack, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Platform, ScrollView, StyleSheet } from 'react-native';

interface Capitulo {
  capitulo_id: number;
  capitulo_nombre: string;
  numero: number;
  poster_url: string;
  serie_sinopsis: string;
  serie_titulo: string;
  series_id: number;
}

type Capitulos = Capitulo[];

export default function SeriesDetail() {
    const { id } = useLocalSearchParams();
    const [capitulos, setCapitulos] = useState<Capitulos>([]);

    useEffect(() => {
      async function loadEpisodes() {
        try {
          const data = await fetchEpisodes(Number(id));
          setCapitulos(data);
        } catch (err) {
          console.error('Error loading episodes:', err);
        }
    }
      loadEpisodes();
    }, []);
    
    return (
      <>
        <Stack.Screen 
          options={{
            title: capitulos.length > 0 ? capitulos[0].serie_titulo : 'Loading...',
            headerShown: true,
            headerBackTitle: 'Series',
            headerTintColor: '#68cc5c',
          }} 
        />
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          {capitulos.length > 0 && (
            <>
              <Image
                source={{ uri: capitulos[0].poster_url }}
                style={styles.posterImage}
                contentFit="cover"
              />
              <ThemedText type="subtitle" style= {styles.capituloTitle}>{capitulos[0].serie_titulo}</ThemedText>
              <ThemedText style={styles.sinopsis}>{capitulos[0].serie_sinopsis}</ThemedText>
            </>
          )}
          <ThemedText type="subtitle" style= {styles.capituloTitle}>Capitulos</ThemedText>
            {capitulos.map((capitulo) => (
              <ThemedText 
                key={capitulo.capitulo_id} 
                style={styles.episodios}
              >
                {`${capitulo.numero}. ${capitulo.capitulo_nombre}`}
              </ThemedText>
            ))}
        </ScrollView>
      </>
    );
}

const isWeb = Platform.OS === 'web';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  posterImage: {
    width: isWeb ? '100%' : '100%',
    aspectRatio: 2/3,
    maxWidth: 400,
    borderRadius: 8,
    ...(isWeb ? {} : { marginBottom: 16 }),
  },
  capituloTitle: {
    marginHorizontal: 40, 
    marginVertical: 30,
    fontSize: 30,
  },
  sinopsis: {
    marginHorizontal: 40, 
    marginTop: 40
  },
  episodios: {
    marginBottom: 30,
    textAlign: 'left',
    alignSelf: 'flex-start',
    marginHorizontal: 40
  }
});