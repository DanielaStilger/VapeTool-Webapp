import { useState } from 'react';
import { Settings as LayoutSettings } from '@ant-design/pro-layout';
import defaultSettings from '../../config/defaultSettings';


export const useSettings = () => {
    const [settings, setSettings] = useState<LayoutSettings>(defaultSettings);

    return {
        settings, setSettings
    };
}
