import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService';
import Like from './common/like';
import Pagination from './common/pagination';
import {paginate} from '../utils/paginate';

class Movies extends Component {
    state = {  
        movies: getMovies(),
        pageSize: 4,
        currentPage: 1  
    }

    render() { 
        const {length: count} = this.state.movies;
        const {movies: allMovies, pageSize, currentPage} = this.state;
        
        const movies = paginate(allMovies, currentPage, pageSize);


        if (count === 0) return <h3>No movies</h3>
    
        return (
            <div>
                <h3>
                   Movies
                </h3>

                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th>Title</th>
                        <th>Genre</th>
                        <th>Stock</th>
                        <th>Rate</th>
                        <th></th>
                        <th></th>
                    </tr>
                    </thead>

                    <tbody >
                    {movies.map(movie => (
                        <tr  key={movie._id}>
                            <td>{ movie.title }</td>
                            <td>{ movie.genre.name }</td>
                            <td>{ movie.numberInStock }</td>
                            <td>{ movie.dailyRentalRate }</td>
                            <td>
                                <Like toggleLike={() => this.handleLike(movie)}
                                    liked={movie.liked}                                
                                />
                            </td>
                            <td>
                                <button onClick={(movie) => this.handleDelete(movie)}
                                    style={{cursor: 'pointer'}}
                                    className='btn btn-danger btn-small'>
                                     Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                 
                    </tbody>
                </table>

                <Pagination 
                    itemsCount={count}
                    pageSize={pageSize}
                    onPageChange={this.handlePageChange}
                    currentPage={currentPage}
                />
            </div>
        );
    }

    handlePageChange = (page) => {
        this.setState({currentPage: page});
    }

    handleLike = (movie) => {
        // make shallow copy
        const movies = [...this.state.movies];
        const index = movies.indexOf(movie);
        // clone the object at index 
        movies[index] = {...movies[index]};
        // toggle the prop liked
        movies[index].liked = !movies[index].liked;
        this.setState({movies})
     }

    handleDelete = (movie) => {
        const movies = this.state.movies.filter(m => m._id !== movie._id);
        this.setState({movies});
    }
}

export default Movies;  
