import { useDropzone } from "react-dropzone";
import { Box, Typography, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export default function ImageUpload({ file, setFile }) {

  const onDrop = (acceptedFiles) => {
    setFile(acceptedFiles[0]);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] }
  });

  return (
    <Box
      {...getRootProps()}
      sx={{
        border: "2px dashed gray",
        padding: 3,
        textAlign: "center",
        cursor: "pointer",
        mt: 2
      }}
    >
      <input {...getInputProps()} />

      {file ? (
        <Box>
          <img
            src={URL.createObjectURL(file)}
            alt=""
            style={{ width: "100%", maxHeight: 200 }}
          />

          <IconButton onClick={(e)=>{
            e.stopPropagation();
            setFile(null);
          }}>
            <DeleteIcon />
          </IconButton>
        </Box>
      ) : (
        <Typography>
          {isDragActive
            ? "Drop image here..."
            : "Drag & Drop image OR Click to Upload"}
        </Typography>
      )}
    </Box>
  );
}