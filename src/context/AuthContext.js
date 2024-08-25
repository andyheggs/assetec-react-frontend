export const signUp = async (data) => {
    const response = await fetch('http://localhost:8000/sign-up/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return response;
  };
  