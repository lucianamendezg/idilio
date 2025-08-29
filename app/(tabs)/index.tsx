import { fetchSeries } from '@/api/fetchSeries';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { FlatList, Pressable, ScrollView, StyleSheet } from 'react-native';

interface Series {
  id: number;
  titulo: string;
  sinopsis: string;
  poster_url: string;
}

interface Category {
  categoria: string;
  series_data: Series[];
}

type Categories = Category[];

export default function HomeScreen() {
  const router = useRouter();
  const [series, setSeries] = useState<Categories>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadSeries() {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchSeries();
        console.log(data);
        setSeries(data);
      } catch (err) {
        console.error('Error loading series:', err);
        setError(err instanceof Error ? err.message : 'Failed to load series');
      } finally {
        setLoading(false);
      }
    }
    loadSeries();
  }, []);

  return (
    <>
      {/* loading */}
      {loading && (
        <ThemedView style={styles.loadingContainer}>
          <Image source={require('@/assets/images/idilio-logo.jpeg')} style={styles.loadingImage} />
        </ThemedView>
      )}

      {/* Main Content */}
      {!loading && (
        <ParallaxScrollView
          headerBackgroundColor={{ light: '#000000', dark: '#000000' }}
          headerImage={
            <Image
              source={require('@/assets/images/idilio-logo.jpeg')}
              style={styles.headerLogo}
            />
          }>
          <ThemedView style={styles.titleContainer}>
            <ThemedText type="title">Series</ThemedText>
          </ThemedView>

          {/* Error state */}
          {error && (
            <ThemedView style={styles.stepContainer}>
              <ThemedText style={styles.error}>Error: {error}</ThemedText>
            </ThemedView>
          )}

          {/* Series list */}
          <FlatList
            data={series}
            keyExtractor={(item:Category) => item.categoria}
            renderItem={({ item: category }: { item: Category }) => {
              return (
              <ThemedView key={category.categoria} style={styles.seriesContainer}>
                <ThemedText type="subtitle">{category.categoria}</ThemedText>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  snapToInterval={166}
                  snapToAlignment="start"
                  decelerationRate="fast"
                  contentContainerStyle={styles.horizontalListContent}
                >
                  {category.series_data.map((series) => (
                    <Pressable
                      key={series.id.toString()}
                      onPress={() => router.push({
                        pathname: "/series/[id]",
                        params: {       
                          id: series.id.toString()
                        }
                      })}
                      style={styles.pressable}
                    >
                      <Image
                        source={{ uri: series.poster_url }}
                        style={styles.poster}
                      />
                      <ThemedText style={styles.titulo}>
                        {series.titulo}
                      </ThemedText>
                    </Pressable>
                  ))}
                </ScrollView>
              </ThemedView>
            );
            }}
          />
        </ParallaxScrollView>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  error: {
    color: 'red',
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  seriesContainer: {
    gap: 8,
    padding: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
  },
  pressable: {
    width: 150, 
    marginHorizontal: 10, 
    marginTop: 10,
  },
  categories: {
    fontSize: 12,
    fontStyle: 'italic',
    opacity: 0.7,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
  },
  loadingImage: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  headerLogo: {
    width: 100,
    height: 100,
    position: 'absolute',
    top: 20,
    left: 30,
    resizeMode: 'contain',
  },
  horizontalListContent: {
    paddingHorizontal: 0,
  },
  poster: {
    width: 150,
    height: 210,
    borderRadius: 8,
    backgroundColor: '#333',
  },
  titulo: {
    fontWeight: '600',
    marginTop: 10,
  },
});
