import React from "react";
import { Knight } from './Knight.js'
export const Piece = ({ isKnight }) => (isKnight ? <Knight /> : '🌹')
