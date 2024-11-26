export const fetchHello = async () => {
    try {
        const response = await fetch('http://127.0.0.1:8000/');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};