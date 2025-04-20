import { Entertainer } from '../types/Entertainer';

interface FetchEntertainersResponse {
  entertainers: Entertainer[];
  totalNum: number;
}

const API_URL = 'https://final-carter-backend-gha2bxd9gsb9c4e5.eastus-01.azurewebsites.net/api/Entertainer';

export const fetchEntertainers = async (
  pageCount: number,
  pageNum: number
): Promise<FetchEntertainersResponse> => {
  try {
    const response = await fetch(
      `${API_URL}/AllEntertainers?pageCount=${pageCount}&pageNum=${pageNum}`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch entertainers');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching entertainers:', error);
    throw error;
  }
};

export const addEntertainer = async (
  newEntertainer: Entertainer
): Promise<Entertainer> => {
  try {
    const response = await fetch(`${API_URL}/AddEntertainer`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newEntertainer),
    });
    console.log(response);

    if (!response.ok) {
      throw new Error('Failed to add entertainer');
    }

    return await response.json();
  } catch (error) {
    console.error('Error adding entertertainer', error);
    throw error;
  }
};

export const getEntertainerById = async (
    entertainerID: number
  ): Promise<Entertainer> => {
    try {
      const response = await fetch(`${API_URL}/${entertainerID}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error(`Failed to fetch entertainer with ID ${entertainerID}`);
      }
  
      return await response.json();
    } catch (error) {
      console.error('Error fetching entertainer:', error);
      throw error;
    }
  };

  export const updateEntertainer = async (
    entertainer: Entertainer
  ): Promise<Entertainer> => {
    try {
      const response = await fetch(`${API_URL}/UpdateEntertainer/${entertainer.entertainerID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(entertainer),
      });
  
      if (!response.ok) {
        throw new Error('Failed to update entertainer');
      }
  
      return await response.json();
    } catch (error) {
      console.error('Error updating entertainer:', error);
      throw error;
    }
  };

  export const deleteEntertainer = async (id: number): Promise<void> => {
    try {
      const response = await fetch(`${API_URL}/DeleteEntertainer/${id}`, {
        method: 'DELETE',
      });
  
      if (!response.ok) {
        throw new Error('Failed to delete entertainer');
      }
    } catch (error) {
      console.error('Error deleting entertainer:', error);
      throw error;
    }
  };
  
