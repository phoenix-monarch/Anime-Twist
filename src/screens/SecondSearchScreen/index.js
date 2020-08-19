/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import {
  Animated, ScrollView, Text, TextInput, View,
} from 'react-native';
import { connect } from 'react-redux';

import styles from './styles';

import AnimeItem from '../../components/AnimeItem';

import { getAnimeAlternativeTitle, getAnimeSlug, getAnimeTitle } from '../../utils/anime';

const SecondSearchScreen = ({ animeList }) => {
  const downloadTextAnimation = useRef(new Animated.Value(-100)).current;
  const fadeAnimation = useRef(new Animated.Value(0)).current;

  const [firstSearchDone, setFirstSearchDone] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    Animated.sequence([
      Animated.spring(fadeAnimation, {
        toValue: 1,
        useNativeDriver: false, // Disabled so interpolation can be used on width
      }),
      Animated.spring(downloadTextAnimation, {
        toValue: 0,
        useNativeDriver: false,
      }),
    ]).start();
  }, []);

  const handleSearch = (text) => {
    if (!firstSearchDone) setFirstSearchDone(true);

    const query = text.trim().toLowerCase();

    if (query) {
      const results = animeList.filter(
        (anime) => {
          let alternative = getAnimeAlternativeTitle(anime);
          const slug = getAnimeSlug(anime);
          const title = getAnimeTitle(anime).toLowerCase();

          if (alternative) {
            alternative = alternative.toLowerCase();

            return slug.includes(query) || alternative.includes(query) || title.includes(query);
          }

          return slug.includes(query) || title.includes(query);
        },
      );

      setSearchResults(results);
    }
  };

  return (
    <View style={styles.screen}>
      <Animated.View
        style={[styles.animatedInput, {
          opacity: fadeAnimation,
          transform: [{
            translateY: fadeAnimation.interpolate({
              inputRange: [0, 1],
              outputRange: [150, 30],
            }),
          }],
          width: fadeAnimation.interpolate({
            inputRange: [0, 1],
            outputRange: ['0%', '90%'],
          }),
        }]}
      >
        <TextInput
          autoFocus
          onSubmitEditing={(event) => handleSearch(event.nativeEvent.text)}
          placeholder="Search"
          returnKeyType="search"
          style={{
            color: 'white',
            height: 45,
            marginHorizontal: 15,
          }}
        />
      </Animated.View>

      {!firstSearchDone && (
        <Animated.View
          style={[styles.container, {
            left: downloadTextAnimation,
            opacity: downloadTextAnimation.interpolate({
              inputRange: [-100, 0],
              outputRange: [0, 1],
            }),
          }]}
        >
          <Text style={styles.downloadText}>Download your favourite anime!</Text>
          <Text style={{ color: 'white', marginTop: 15 }}>Look for English or Japanese titles.</Text>
        </Animated.View>
      )}

      {firstSearchDone && searchResults.length === 0 && (
        <View style={styles.container}>
          <Text style={{ color: 'white' }}>No results.</Text>
        </View>
      )}

      {firstSearchDone && searchResults.length !== 0 && (
        <ScrollView
          contentContainerStyle={{
            alignItems: 'center',
            paddingTop: 50,
          }}
          overScrollMode="never"
          style={{
            marginTop: 50,
            width: '100%',
          }}
        >
          {searchResults.map((result) => (
            <AnimeItem
              alternative={result.alt_title}
              key={result.id}
              title={result.title}
            />
          ))}
        </ScrollView>
      )}
    </View>
  );
};

SecondSearchScreen.propTypes = {
  animeList: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = (state) => ({ animeList: state.animeReducer.animeList });

export default connect(mapStateToProps)(SecondSearchScreen);
