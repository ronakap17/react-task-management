import React from 'react';
import classes from './style.module.scss';
import { FilePayload } from '..';

export interface PreviewProps {
    files: FilePayload[]
    removeFile: (index: number) => void
}

export type PreviewComponent = React.FC<PreviewProps>

const Preview: PreviewComponent = ({files, removeFile}) => (
    <div className={classes['file-preview-container']}>
        {files.map((file, index) =>
            <div className={classes['preview']} key={index}>
                <img src={file.previewUrl} alt="..."/>
                <i className={`bx bxs-x-circle ${classes["icon"]}`} onClick={() => removeFile(index)}></i>
            </div>
        )}
    </div>
);

export default Preview
