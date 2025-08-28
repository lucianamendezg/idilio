import { fetchSeries } from '@/api/fetchSeries';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Image } from 'expo-image';
import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';

// TypeScript interface for Series data
interface Series {
  id: number;
  created_at: string;
  titulo: string;
  sinopsis: string;
  poster_url: string;
  categoria: string[];
}

export default function HomeScreen() {
  const [series, setSeries] = useState<Series[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadSeries() {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchSeries();
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
            <HelloWave />
          </ThemedView>

          {/* Error state */}
          {error && (
            <ThemedView style={styles.stepContainer}>
              <ThemedText style={{ color: 'red' }}>Error: {error}</ThemedText>
            </ThemedView>
          )}

          {/* Series list */}
          {series.map((item) => (
            <ThemedView key={item.id} style={styles.seriesContainer}>
              <ThemedText type="subtitle">{item.titulo}</ThemedText>
              <ThemedText>{item.sinopsis}</ThemedText>
              <ThemedText style={styles.categories}>
                Categories: {item.categoria.join(', ')}
              </ThemedText>
              <Image source={{ uri: item.poster_url }} style={{ width: '100%', height: 200, borderRadius: 8 }} />
            </ThemedView>
          ))}
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
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  seriesContainer: {
    gap: 8,
    marginBottom: 16,
    padding: 16,
    borderRadius: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
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
  }
});
