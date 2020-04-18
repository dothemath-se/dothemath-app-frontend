import ApiService from './api';

export interface Dependencies {
  apiService: ApiService;
}

interface ApiService {
  getSubjects: Function;
  sendMessage: Function;
  establishSession: Function;
  reestablishSession: Function;
  cancelSession: Function;
  onMessage: Function;
}
