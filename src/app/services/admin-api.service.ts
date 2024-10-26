import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_ENDPOINTS } from './api-endpoints';


@Injectable({
  providedIn: 'root'
})
export class AdminApiService {

  private baseUrl = 'http://localhost:3000'

  constructor(private _http: HttpClient) { }

  // User APIS 
  getUsers(): Observable<any> {
    return this._http.get(`${this.baseUrl}${API_ENDPOINTS.USERS}`);
  }

  createUser(user: any): Observable<any> {
    return this._http.post(`${this.baseUrl}${API_ENDPOINTS.CREATE_USER}`, user);
  }

  updateUser(id: string, user: any): Observable<any> {
    return this._http.put(`${this.baseUrl}${API_ENDPOINTS.UPDATE_USER(id)}`, user);
  }

  deleteUser(id: string): Observable<any> {
    return this._http.delete(`${this.baseUrl}${API_ENDPOINTS.DELETE_USER(id)}`);
  }


  // MEnu Api

  getmenus(): Observable<any> {
    return this._http.get(`${this.baseUrl}${API_ENDPOINTS.MENU}`);
  }

  createMenu(menu: any): Observable<any> {
    return this._http.post(`${this.baseUrl}${API_ENDPOINTS.CREATE_MENU}`, menu);
  }

  updateMenu(id: string, menu: any): Observable<any> {
    return this._http.put(`${this.baseUrl}${API_ENDPOINTS.UPDATE_MENU(id)}`, menu);
  }


  deleteMenu(id: string): Observable<any> {
    return this._http.delete(`${this.baseUrl}${API_ENDPOINTS.DELETE_MENU(id)}`);
  }


  // role Api

  getroles(): Observable<any> {
    return this._http.get(`${this.baseUrl}${API_ENDPOINTS.ROLE}`);
  }

  createRole(role: any): Observable<any> {
    return this._http.post(`${this.baseUrl}${API_ENDPOINTS.CREATE_ROLE}`, role);
  }

  updateRole(id: string, role: any): Observable<any> {
    return this._http.put(`${this.baseUrl}${API_ENDPOINTS.UPDATE_ROLE(id)}`, role);
  }

  deleteRole(id: string): Observable<any> {
    return this._http.delete(`${this.baseUrl}${API_ENDPOINTS.DELETE_ROLE(id)}`);
  }


  //content API

  // userlogin Api

  login(email: string, password: string): Observable<any> {
    return this._http.post(`${this.baseUrl}${API_ENDPOINTS.LOGIN}`, { email, password });
  }

  getContent(): Observable<any> {
    return this._http.get(`${this.baseUrl}${API_ENDPOINTS.CONTENT}`);
  }

  createContent(content: any): Observable<any> {
    return this._http.post(`${this.baseUrl}${API_ENDPOINTS.CREATE_CONTENT}`, content);
  }

  updateContent(id: string, content: any): Observable<any> {
    return this._http.put(`${this.baseUrl}${API_ENDPOINTS.UPDATE_CONTENT(id)}`, content);
  }

  deleteContent(id: string): Observable<any> {
    return this._http.delete(`${this.baseUrl}${API_ENDPOINTS.DELETE_CONTENT(id)}`);
  }

  // Carousel API

  getCarousel(): Observable<any> {
    return this._http.get(`${this.baseUrl}${API_ENDPOINTS.CAROUSEL}`);
  }

  createCarousel(carousel: any): Observable<any> {
    return this._http.post(`${this.baseUrl}${API_ENDPOINTS.CREATE_CAROUSEL}`, carousel);
  }

  updateCarousel(id: string, carousel: any): Observable<any> {
    return this._http.put(`${this.baseUrl}${API_ENDPOINTS.UPDATE_CAROUSEL(id)}`, carousel);
  }

  deleteCarousel(id: string): Observable<any> {
    return this._http.delete(`${this.baseUrl}${API_ENDPOINTS.DELETE_CAROUSEL(id)}`);
  }


  // Category API

  getCategory(): Observable<any> {
    return this._http.get(`${this.baseUrl}${API_ENDPOINTS.CATEGORY}`);
  }

  createCategory(category: any): Observable<any> {
    return this._http.post(`${this.baseUrl}${API_ENDPOINTS.CREATE_CATEGORY}`, category);
  }

  updateCategory(id: string, category: any): Observable<any> {
    return this._http.put(`${this.baseUrl}${API_ENDPOINTS.UPDATE_CATEGORY(id)}`, category);
  }

  deleteCategory(id: string): Observable<any> {
    return this._http.delete(`${this.baseUrl}${API_ENDPOINTS.DELETE_CATEGORY(id)}`);
  }

}
