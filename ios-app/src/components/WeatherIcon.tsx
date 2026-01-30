import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../constants/theme';

interface WeatherIconProps {
  code: number;
  size?: number;
}

export default function WeatherIcon({ code, size = 32 }: WeatherIconProps) {
  if (code === 0 || code === 1) {
    return <Ionicons name="sunny" size={size} color={colors.yellow[500]} />;
  } else if (code >= 2 && code <= 3) {
    return <Ionicons name="partly-sunny" size={size} color={colors.gray[500]} />;
  } else if (code >= 45 && code <= 48) {
    return <Ionicons name="cloudy" size={size} color={colors.gray[400]} />;
  } else if ((code >= 51 && code <= 67) || (code >= 80 && code <= 82)) {
    return <Ionicons name="rainy" size={size} color={colors.blue[500]} />;
  } else if ((code >= 71 && code <= 77) || (code >= 85 && code <= 86)) {
    return <Ionicons name="snow" size={size} color={colors.blue[100]} />;
  } else if (code >= 95) {
    return <Ionicons name="thunderstorm" size={size} color="#8B5CF6" />;
  }
  return <Ionicons name="cloud" size={size} color={colors.gray[400]} />;
}
