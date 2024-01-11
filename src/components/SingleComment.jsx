import { Button, ListGroup } from 'react-bootstrap'

const SingleComment = ({ comment }) => {
  const deleteComment = async (asin) => {
    try {
      let response = await fetch(
        'https://striveschool-api.herokuapp.com/api/comments/' + asin,
        {
          method: 'DELETE',
          headers: {
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTlmZTk3OTI5ZTM2YjAwMTg2N2VjYTUiLCJpYXQiOjE3MDQ5Nzg4MDksImV4cCI6MTcwNjE4ODQwOX0.bX7OZm3ICX0Wh69KHe69fNg4WFAZxEijO59gPpD1wdg',
          },
        }
      )
      if (response.ok) {
        alert('Comment was deleted successfully!')
      } else {
        alert('Error - comment was NOT deleted!')
      }
    } catch (error) {
      alert('Error - comment was NOT deleted!')
    }
  }

  return (
    <ListGroup.Item data-testid="single-comment">
      {comment.comment}
      <Button
        variant="danger"
        className="ms-2"
        onClick={() => deleteComment(comment._id)}
      >
        Elimina
      </Button>
    </ListGroup.Item>
  )
}

export default SingleComment