import React from 'react';
import classes from './style.module.scss';
import { FilePayload } from '..';
import Icon from '~/components/Icon';

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
                <Icon name="bxs-x-circle" size={20} className={classes["icon"]} onClick={() => removeFile(index)} />
            </div>
        )}
    </div>
);

export default Preview
