import React from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import { useHistory } from 'react-router';
import { useForm } from 'react-hook-form';

export const UPLOAD_FILE = gql`
  mutation uploadFile($file: Upload!) {
    uploadFile(file: $file) {
      file
    }
  }
`;

function UploadFiles() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [file, setFile] = React.useState({})
    const [upload_FILE] = useMutation(UPLOAD_FILE, {
        variables: {
            file
        },
        onCompleted: () => {
            console.log('====================================');
            return  console.log('upload_FILE: ');
        }
    });
    const onSubmit = async () => {
        upload_FILE().catch((res) => {
            res.graphQLErrors.map((error: any) => {
                console.log(error);
                return error.message;
            });
        }).then(res => {

        });
    };
    const onChangeIMG = async (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log("file");
        const target = event.target as HTMLInputElement;
        const file: File = (target.files as FileList)[0];
        console.log("file");
        await setFile(file)

    };

    console.log(useHistory,register,errors);

    return (
        <React.Fragment>
            <div style={{ backgroundColor: "white" }}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input type="file" onChange={onChangeIMG} />
                    <input type="submit" />
                </form>
            </div>
        </React.Fragment>
    );
};

export default UploadFiles
