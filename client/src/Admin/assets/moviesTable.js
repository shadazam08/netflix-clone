
//temporary Data
// import user_image from '../images/userDefault.jpg';

export const userColumn = [
    { field: 'id', headerName: 'S.No', width: 50, sortable: false },
    { field: 'title', headerName: 'Title', width: 200, },
    {
        field: 'poster_url', headerName: 'Poster', width: 200, renderCell: (params) => {
            return (
                <div className="cellWithImg">
                    <img
                        className="user-avatar"
                        src={`http://localhost:5000/uploadsImageandVideo/${params.row.poster_url}`}
                        alt={params.row.poster_url}
                    />
                </div>
            );
        },
    },
    { field: 'director', headerName: 'Director Name', width: 200 },
    { field: 'release_date', headerName: 'Release Date', width: 150 },
    { field: 'duration', headerName: 'Length', width: 100 },
    { field: 'category_name', headerName: 'Category', width: 250 },
    { field: 'name', headerName: 'Genres', width: 150 },

];