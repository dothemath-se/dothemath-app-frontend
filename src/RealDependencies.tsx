import React, { ReactNode } from 'react';
import { DependencyContext } from '.';
import { Dependencies } from './Dependencies';
import realApi from './api';

export default function RealDependencies(props: { children: ReactNode }) {
  return (
    <DependencyContext.Provider value={realDependencies}>
      {props.children}
    </DependencyContext.Provider>
  );
}

const realDependencies: Dependencies = {
  apiService: realApi,
};
