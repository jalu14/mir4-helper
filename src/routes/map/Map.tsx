import React, { useState, useEffect } from "react";
import { Box, Button, Flex, Heading, Image, Text, VStack } from "@chakra-ui/react";
import { useNavigate } from 'react-router-dom';

export const Map = () => {

    const navigate = useNavigate();
    const [currentMap, setCurrentMap] = useState<IMap>(GlobalMap);
    const [image, setImage]: any = useState();
    const [currentCords, setCurrentCords]: any = useState();
    const [realCords, setRealCords]: any = useState();
    const [ratio, setRatio]: any = useState(1);
    const [realRatio, setRealRatio]: any = useState();

    let innerCurrentMap: IMap = GlobalMap; // Los event listeners no actualizan con el useState

    useEffect(() => {
        let docImage: any = document.getElementById('image');
        setImage(docImage);

        window.addEventListener('popstate', onPopState);
        function onPopState() {
            let map = window.location.search.split('map=');
            updateMap(map[1] || GlobalMap, true);
        }

        window.addEventListener('keydown', onKeyDown);
        function onKeyDown(k: any) {
            if (k.altKey && k.code.includes('Digit')) {
                if (!innerCurrentMap.areas?.length) return;
                let digit = k.code.split('Digit')[1];
                let area = innerCurrentMap.areas[+digit - 1];
                if (area) updateMap(area);
            }

            if (k.altKey && k.code === 'KeyG') {
                updateMap(GlobalMap);
            }
        }

        let loadLoop = setInterval(() => {
            if (!docImage.naturalWidth) return;
            setRealRatio(docImage.naturalWidth / docImage.naturalHeight)
            setRatio(docImage.naturalWidth / docImage.width);
        }, 100);

        return () => {
            window.removeEventListener('popstate', onPopState);
            window.removeEventListener('keydown', onKeyDown);
            clearInterval(loadLoop);
        }
    }, []);

    function updateMap(newMap: IMap | string, popped: boolean = false) {
        let map: any = newMap;
        if (typeof map === 'string') {
            map = findArea(GlobalMap, map);
        }
        setCurrentMap(map);
        innerCurrentMap = map;

        if (!popped && map.id !== 'global') {
            navigate({
                pathname: '/map',
                search: `?map=${map.id}`
            });
        }

    }

    function findArea(map: IMap, areaId: string): IMap | void {
        if (map.id === areaId) return map;
        if (!map.areas?.length) return;
        for (const area of map.areas) {
            if (area.id === areaId) return area;
            let foundArea = findArea(area, areaId);
            if (foundArea) return foundArea;
        }
    }

    function updateImageCoords(e: any) {
        if (!image) return;
        let currentX = e.pageX - image.x;
        let currentY = e.pageY - image.y;

        let realX = currentX * ratio;
        let realY = currentY * ratio;

        setCurrentCords({ x: Math.round(currentX), y: Math.round(currentY) });
        setRealCords({ x: Math.round(realX), y: Math.round(realY) })
    }

    return (
        <Flex flexGrow="1" overflow="hidden">
            <Box width="30%" minWidth="20em">
                <MapAside />
                <VStack p={4} justifyContent="flex-end" alignItems="flex-end">
                    <Text>Clicked: x: {currentCords?.x || '-'} | y: {currentCords?.y || '-'}</Text>
                    <Text>Real: x: {realCords?.x || '-'} | y: {realCords?.y || '-'}</Text>
                    <Text>Ratio: {ratio?.toFixed(4) || '-'}</Text>
                    <Text>Real ratio: {realRatio?.toFixed(4) || '-'}</Text>
                </VStack>
            </Box>

            <Box position="relative" flexGrow="1">
                <Image
                    id="image"
                    draggable={false}
                    bgSize="contain"
                    src={currentMap.image}
                    onClick={updateImageCoords} />
                {
                    currentMap.markers?.map((marker: any) => {
                        if (!marker.areaId) return <></>;
                        return (
                            <button
                                key={marker.areaId}
                                onClick={() => updateMap(marker.areaId)}
                                tabIndex={-1}
                                style={{
                                    userSelect: 'none',
                                    width: `${marker.size.width / ratio * realRatio}px`,
                                    height: `${marker.size.height / ratio * realRatio}px`,
                                    background: '#ff000050',
                                    position: 'absolute',
                                    top: `${Math.round((marker.position.y / ratio - marker.size.height / ratio * realRatio / 2))}px`,
                                    left: `${Math.round((marker.position.x / ratio - marker.size.width / ratio * realRatio / 2))}px`
                                }}
                            />
                        )
                    })
                }
            </Box>
        </Flex>
    )


    function MapAside() {
        return (
            <Box>
                <Flex>
                    <Heading px={3} mb="2" size="lg">{currentMap.name}</Heading>
                </Flex>

                {currentMap.areas?.map(area => {
                    return (
                        <Button
                            key={area.id}
                            size="lg"
                            justifyContent="start"
                            w="100%"
                            borderRadius="0"
                            onClick={() => updateMap(area)}>
                            <Flex w="100%" alignItems="center" justifyContent="space-between">
                                <Text fontSize="large">{area.name}</Text>
                            </Flex>
                        </Button>
                    )
                })}
            </Box>
        )
    }
}

// Esto vendrá cargado de un js
const GlobalMap: IMap = {
    id: 'global',
    name: 'Global',
    image: '/maps/main.jpg',
    markers: [
        {
            areaId: 'bicheon',
            position: { x: 822, y: 775 },
            size: { width: 100, height: 90 }
        },
        {
            areaId: 'snake-pit',
            position: { x: 742, y: 408 },
            size: { width: 100, height: 90 }
        },
    ],
    areas: [
        {
            id: 'bicheon',
            name: "Bicheon Area",
            image: '/maps/bicheon/main.jpg',
            markers: [
                {
                    areaId: 'global',
                    position: { x: 110, y: 45 },
                    size: { width: 100, height: 40 }
                },
                {
                    areaId: 'snake-pit',
                    position: { x: 1860, y: 963 },
                    size: { width: 40, height: 40 }
                },
                {
                    areaId: 'peach-blossom-valley',
                    position: { x: 221, y: 660 },
                    size: { width: 70, height: 80 }
                }
            ],
            areas: [
                {
                    id: 'peach-blossom-valley',
                    name: 'Peach Blossom Valley',
                    image: '/maps/bicheon/peach-blossom-valley/peach-blossom-valley.png',
                    areas: []
                },
                {
                    id: 'seashore-cliff',
                    name: 'Seashore Cliff',
                    image: '/maps/bicheon/peach-blossom-valley/peach-blossom-valley.png',
                    areas: []
                },
                {
                    id: 'ginko-valley',
                    name: 'Ginko Valley',
                    image: '/maps/bicheon/peach-blossom-valley/peach-blossom-valley.png',
                    areas: []
                },
                {
                    id: 'bicheon-castle',
                    name: 'Bicheon Castle',
                    image: '/maps/bicheon/peach-blossom-valley/peach-blossom-valley.png',
                    areas: []
                },
                {
                    id: 'bicheon-town',
                    name: 'Bicheon Town',
                    image: '/maps/bicheon/peach-blossom-valley/peach-blossom-valley.png',
                    areas: []
                },
                {
                    id: 'nefariox-necropolis',
                    name: 'Nefariox Nectropolis',
                    image: '/maps/bicheon/peach-blossom-valley/peach-blossom-valley.png',
                    areas: []
                },
                {
                    id: 'nefariox-ruins',
                    name: 'Nefariox Ruins',
                    image: '/maps/bicheon/peach-blossom-valley/peach-blossom-valley.png',
                    areas: []
                },
            ]
        },
        {
            id: 'snake-pit',
            name: "Snake Pit Area",
            image: '/maps/snake-pit/main.jpg',
            markers: [
                {
                    areaId: 'global',
                    position: { x: 110, y: 45 },
                    size: { width: 100, height: 40 }
                },
                {
                    areaId: 'bicheon',
                    position: { x: 38, y: 672 },
                    size: { width: 40, height: 40 }
                },
            ],
            areas: []
        }
    ]
}

interface IMap {
    id: string;
    name: string;
    image: string;
    areas?: IMap[];
    markers?: IMarkerArea[] | IMarkerResource[] | IMarkerMob[];
    isOpen?: boolean;
}

interface IMarker {
    name?: string;
    size: ISize;
    position: IXY;
}

interface IXY {
    x: number;
    y: number;
}

interface ISize {
    height: number;
    width: number;
}

interface IMarkerArea extends IMarker {
    areaId: string;
}

interface IMarkerResource extends IMarker {
    type: 'ore' | 'energy' | 'herb' | 'darkSteel' | 'chest';
    rarity: 'gray' | 'green' | 'blue' | 'red' | 'yellow'
}

interface IMarkerMob extends IMarker {
    type: 'common' | 'elite' | 'unique' | 'boss';
    image: string;
}

// interface IDrop {

// }